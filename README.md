# Peak Resource README Generator

Peak Resource README Generator scans a FiveM resource and drafts the documentation server owners usually need: installation, dependencies, configuration files, permissions, commands, events, exports, troubleshooting, and a release checklist.

It is intentionally local-first. Source code stays on the machine running the command; the generator does not upload a resource or call an AI service.

## Quick start

Requires Node.js 20+.

```bash
npm test
node bin/peak-readme.js --resource ./resources/[peak]/my-resource --out ./README.generated.md
```

Use `--include-source` to print the detected metadata as JSON for a review pipeline. The result is a draft: verify behavior, defaults, framework compatibility, and permissions before shipping it.

## What it detects

- `fxmanifest.lua` or legacy `__resource.lua` metadata
- `dependency`/`dependencies` declarations and common load-order hints
- likely config files under `config` or `shared`
- `RegisterCommand`, `RegisterNetEvent`, `AddEventHandler`, and `exports`
- permission-related references such as ACE checks, groups, jobs, and permissions
- source files while skipping `.git`, `node_modules`, build output, and symlinks

## Release notes

The generated file is not a security audit and does not infer undocumented runtime behavior. Keep secrets out of resource source before sharing scans.

MIT © Peak Studios
