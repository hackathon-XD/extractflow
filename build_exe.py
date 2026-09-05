"""
ExtractFlow AI — EXE Builder
Packages the entire app into a single .exe using PyInstaller

Usage:
  1. pip install pyinstaller
  2. python build_exe.py
  3. Find extractflow.exe in dist/
"""
import subprocess, sys, shutil, os
from pathlib import Path

BASE = Path(__file__).parent
DIST = BASE / "dist"
BUILD = BASE / "build"
SPEC = BASE / "extractflow.spec"

print("=" * 60)
print("  ExtractFlow AI — Building EXE...")
print("=" * 60)

# Step 1: Build frontend
print("\n[1/3] Building frontend...")
frontend = BASE / "frontend"
if frontend.exists():
    subprocess.run(["npm", "run", "build"], cwd=str(frontend), check=True)
    print("  ✓ Frontend built")

# Step 2: Clean old builds
print("\n[2/3] Cleaning old builds...")
for d in [DIST, BUILD]:
    if d.exists(): shutil.rmtree(d)
if SPEC.exists(): SPEC.unlink()
print("  ✓ Cleaned")

# Step 3: Create PyInstaller spec and build
print("\n[3/3] Building EXE with PyInstaller...")
print("  (This may take 2-5 minutes...)")

# Create a launcher script
launcher = BASE / "launcher.py"
launcher.write_text('''
"""ExtractFlow AI — Launcher"""
import subprocess, sys, os, webbrowser, time, threading
from pathlib import Path

BASE = Path(__file__).parent
PORT = 4000

def start_backend():
    sys.path.insert(0, str(BASE / "server"))
    os.chdir(str(BASE))
    import uvicorn
    from main import app
    uvicorn.run(app, host="0.0.0.0", port=PORT)

def open_browser():
    time.sleep(2)
    webbrowser.open(f"http://localhost:{PORT}")

if __name__ == "__main__":
    print("\\n  ⚡ ExtractFlow AI starting...")
    print(f"  🌐 Open http://localhost:{PORT} in your browser\\n")
    threading.Thread(target=open_browser, daemon=True).start()
    start_backend()
''', encoding="utf-8")

# Write the spec file
spec_content = f"""# -*- mode: python ; coding: utf-8 -*-
a = Analysis(
    ['{str(launcher)}'],
    pathex=['{str(BASE)}', '{str(BASE / "server")}'],
    binaries=[],
    datas=[
        ('{str(BASE / "frontend" / "dist")}', 'frontend/dist'),
        ('{str(BASE / "server")}', 'server'),
        ('{str(BASE / "requirements.txt")}', '.'),
    ],
    hiddenimports=['uvicorn', 'uvicorn.logging', 'uvicorn.loops', 'uvicorn.loops.auto', 'uvicorn.protocols', 'uvicorn.protocols.http', 'uvicorn.protocols.http.auto', 'uvicorn.protocols.websockets', 'uvicorn.protocols.websockets.auto', 'uvicorn.lifespan', 'uvicorn.lifespan.on', 'fastapi', 'starlette', 'multipart', 'pydantic', 'llama_cpp', 'huggingface_hub', 'requests', 'PyPDF2', 'aiohttp'],
    hookspath=[],
    hooksconfig={{}},
    runtime_hooks=[],
    excludes=[],
    noarchive=False,
)
pyz = PYZ(a.pure)
exe = EXE(
    pyz, a.scripts, a.binaries, a.datas,
    [],
    name='ExtractFlow',
    debug=False,
    bootloader_ignore_signals=False,
    strip=False,
    upx=True,
    upx_exclude=[],
    runtime_tmpdir=None,
    console=True,
    disable_windowed_traceback=False,
    argv_emulation=False,
    target_arch=None,
    codesign_identity=None,
    entitlements_file=None,
    icon=None,
)
"""
SPEC.write_text(spec_content, encoding="utf-8")

# Run PyInstaller
result = subprocess.run(
    [sys.executable, "-m", "PyInstaller", "--clean", "--noconfirm", str(SPEC)],
    cwd=str(BASE)
)

if result.returncode == 0:
    exe_path = DIST / "ExtractFlow.exe"
    if exe_path.exists():
        size_mb = exe_path.stat().st_size / (1024 * 1024)
        print(f"\n{'=' * 60}")
        print(f"  ✅ BUILD SUCCESSFUL!")
        print(f"  📦 {exe_path} ({size_mb:.1f} MB)")
        print(f"{'=' * 60}")
    else:
        print("\n  ❌ EXE not found in dist/")
else:
    print(f"\n  ❌ Build failed with exit code {result.returncode}")

# Cleanup
launcher.unlink(missing_ok=True)
