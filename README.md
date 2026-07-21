# Peak Resource README Generator

Peak Resource README Generator scans a FiveM resource and drafts the documentation server owners usually need: installation, dependencies, configuration files, permissions, commands, events, exports, troubleshooting, and a release checklist.

It is intentionally local-first. Source code stays on the machine running the command; the generator does not upload a resource or call an AI service.

## Quick start

Requires Node.js 20+.

```bash
npm test
node bin/peak-readme.js --resource "./resources/[peak]/my-resource" --out ./README.generated.md
```

Use `--include-source` to print the detected metadata as JSON for a review pipeline. Add `--ai` for an optional polish pass. Hosted providers use `PEAK_README_AI_KEY`; Ollama needs no key:

```powershell
# Hosted OpenAI-compatible provider
$env:PEAK_README_AI_PROVIDER = "openai-compatible"
$env:PEAK_README_AI_KEY = "your-key"
$env:PEAK_README_AI_MODEL = "your-model"

# Local Ollama (start `ollama serve` first)
$env:PEAK_README_AI_PROVIDER = "ollama"
$env:PEAK_README_AI_ENDPOINT = "http://127.0.0.1:11434/v1/chat/completions"
$env:PEAK_README_AI_MODEL = "llama3.2"
```

Any service implementing OpenAI-compatible chat completions works by setting `PEAK_README_AI_ENDPOINT`, `PEAK_README_AI_MODEL`, and (if required) `PEAK_README_AI_KEY`. Non-Bearer services can set `PEAK_README_AI_KEY_HEADER` and `PEAK_README_AI_KEY_PREFIX` (for example `api-key` and an empty prefix). The scan and deterministic draft work without AI, and an AI failure automatically keeps the local draft. Never send a resource containing secrets.

## What it detects

- `fxmanifest.lua` or legacy `__resource.lua` metadata
- `dependency`/`dependencies` declarations and common load-order hints
- likely config files under `config` or `shared`
- `RegisterCommand`, `RegisterNetEvent`, `AddEventHandler`, and `exports`
- permission-related references such as ACE checks, groups, jobs, and permissions
- source files while skipping `.git`, `node_modules`, build output, and symlinks

## Non-coder workflow

1. Install Node.js 20 or newer.
2. Open a terminal in this project folder.
3. Run the command above, replacing the resource path with the folder that contains `fxmanifest.lua`.
4. Open `README.generated.md` and replace every “detected” item with the real server-owner instruction.
5. If you use `--ai`, treat its result as editing assistance—not as proof of permissions or compatibility.

If the command says no manifest was found, select the resource's actual folder rather than its parent `[category]` folder.

## Release notes

The generated file is not a security audit and does not infer undocumented runtime behavior. Keep secrets out of resource source before sharing scans.

MIT © Peak Studios
