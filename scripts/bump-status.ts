import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { statusSchema, type Phase, type Status } from '../src/data/statusSchema';

type PhaseUpdate = {
  key: Phase['key'];
  status: Phase['status'];
};

type FindingsKey = keyof Status['security']['publicFindings'];

type SetOperation = {
  path: string;
  value: string;
};

function parseArgs(argv: string[]) {
  const phaseUpdates: PhaseUpdate[] = [];
  const findingsUpdates: Partial<Record<FindingsKey, number>> = {};
  const setOperations: SetOperation[] = [];
  let overall: number | undefined;

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === '--phase') {
      const payload = argv[++index];
      if (!payload) {
        throw new Error('Missing value for --phase. Use --phase devnet:in_progress');
      }
      const [key, status] = payload.split(':');
      if (!key || !status) {
        throw new Error(`Invalid --phase payload: ${payload}`);
      }
      phaseUpdates.push({ key: key as Phase['key'], status: status as Phase['status'] });
      continue;
    }

    if (arg === '--overall') {
      const payload = argv[++index];
      if (!payload) {
        throw new Error('Missing value for --overall.');
      }
      overall = Number.parseInt(payload, 10);
      if (Number.isNaN(overall)) {
        throw new Error(`Invalid --overall value: ${payload}`);
      }
      continue;
    }

    if (arg.startsWith('--findings.')) {
      const payload = argv[++index];
      if (!payload) {
        throw new Error(`Missing value for ${arg}.`);
      }
      const key = arg.replace('--findings.', '') as FindingsKey;
      const value = Number.parseInt(payload, 10);
      if (Number.isNaN(value)) {
        throw new Error(`Invalid findings value for ${key}: ${payload}`);
      }
      findingsUpdates[key] = value;
      continue;
    }

    if (arg === '--set') {
      const payload = argv[++index];
      if (!payload) {
        throw new Error('Missing value for --set. Use --set meta.lastUpdated=auto');
      }
      const [path, rawValue] = payload.split('=');
      if (!path || rawValue === undefined) {
        throw new Error(`Invalid --set payload: ${payload}`);
      }
      setOperations.push({ path, value: rawValue });
      continue;
    }

    throw new Error(`Unknown argument: ${arg}`);
  }

  return { phaseUpdates, findingsUpdates, setOperations, overall };
}

function setByPath(object: Record<string, unknown>, path: string, value: unknown) {
  const segments = path.split('.');
  let current: Record<string, unknown> = object;

  segments.forEach((segment, index) => {
    if (index === segments.length - 1) {
      current[segment] = value as never;
      return;
    }

    if (!(segment in current)) {
      current[segment] = {};
    }

    current = current[segment] as Record<string, unknown>;
  });
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const statusPath = resolve(process.cwd(), 'status.json');
  const fileContents = await readFile(statusPath, 'utf-8');
  const parsed = statusSchema.parse(JSON.parse(fileContents));

  if (typeof args.overall === 'number') {
    parsed.meta.overallTrajectoryPct = args.overall;
  }

  for (const update of args.phaseUpdates) {
    const targetPhase = parsed.phases.find((phase) => phase.key === update.key);
    if (!targetPhase) {
      throw new Error(`Phase not found: ${update.key}`);
    }
    targetPhase.status = update.status;
  }

  for (const [key, value] of Object.entries(args.findingsUpdates)) {
    parsed.security.publicFindings[key as FindingsKey] = value as number;
  }

  for (const operation of args.setOperations) {
    if (operation.value === 'auto' && operation.path === 'meta.lastUpdated') {
      setByPath(parsed as unknown as Record<string, unknown>, operation.path, new Date().toISOString());
    } else {
      setByPath(parsed as unknown as Record<string, unknown>, operation.path, operation.value);
    }
  }

  const validated = statusSchema.parse(parsed);
  await writeFile(statusPath, `${JSON.stringify(validated, null, 2)}\n`);
  console.log('status.json updated successfully ✅');
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
