load("@npm//html-insert-assets:index.bzl", "html_insert_assets")

def insert_html_assets(name, outs, html_file, asset_paths, data, scripts = [], nomodule_scripts = [], preloaded_assets = [], manifest = None):
    args = [
        "--html",
        "$(execpath %s)" % html_file,
        "--out",
        "$@",
        "--roots",
        "$(RULEDIR)",
    ]

    if asset_paths:
        args = args + ["--assets"] + asset_paths

    if preloaded_assets:
        args = args + ["--preload"] + preloaded_assets

    if scripts:
        args = args + ["--scripts --module"] + scripts

    if nomodule_scripts:
        args = args + ["--scripts --nomodule"] + nomodule_scripts

    if manifest:
        args = args + ["--manifest", manifest]

    html_insert_assets(
        name = name,
        outs = outs,
        args = args,
        data = data,
    )
