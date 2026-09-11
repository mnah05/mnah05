#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

if ! command -v tectonic >/dev/null 2>&1; then
	echo "error: tectonic not found." >&2
	echo "install it from https://tectonic-typesetting.github.io/en-US/install.html" >&2
	exit 1
fi

tectonic resume.tex --outdir public

echo "wrote public/resume.pdf"
