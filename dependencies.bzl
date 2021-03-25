"""
External Bazel dependencies
"""

load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")

def dependencies():
    """
    Installs all external dependencies so that they can be installed in the WORKSPACE file
    """

    # Common useful functions and rules for Bazel
    # https://github.com/bazelbuild/bazel-skylib/releases
    http_archive(
        name = "bazel_skylib",
        sha256 = "1c531376ac7e5a180e0237938a2536de0c54d93f5c278634818e0efc952dd56c",
        urls = ["https://github.com/bazelbuild/bazel-skylib/releases/download/1.0.3/bazel-skylib-1.0.3.tar.gz"],
    )

    # JavaScript and NodeJS rules
    # https://github.com/bazelbuild/rules_nodejs/releases
    http_archive(
        name = "build_bazel_rules_nodejs",
        sha256 = "dd7ea7efda7655c218ca707f55c3e1b9c68055a70c31a98f264b3445bc8f4cb1",
        urls = ["https://github.com/bazelbuild/rules_nodejs/releases/download/3.2.3/rules_nodejs-3.2.3.tar.gz"],
    )

    # Sass rules
    # https://github.com/bazelbuild/rules_sass
    http_archive(
        name = "io_bazel_rules_sass",
        url = "https://github.com/bazelbuild/rules_sass/archive/1.32.8.zip",
        strip_prefix = "rules_sass-1.32.8",
        sha256 = "9ad74e6e75a86939f4349b31d43bb1db4279e4f2a139c5ebaf56cf99feea1faa",
    )

    # Rules to allow testing against a browser with WebDriver
    # https://github.com/bazelbuild/rules_webtesting/releases
    http_archive(
        name = "io_bazel_rules_webtesting",
        sha256 = "9bb461d5ef08e850025480bab185fd269242d4e533bca75bfb748001ceb343c3",
        urls = ["https://github.com/bazelbuild/rules_webtesting/releases/download/0.3.3/rules_webtesting.tar.gz"],
    )

    # Rules for building and handling Docker images
    # https://github.com/bazelbuild/rules_docker/releases
    http_archive(
        name = "io_bazel_rules_docker",
        sha256 = "95d39fd84ff4474babaf190450ee034d958202043e366b9fc38f438c9e6c3334",
        strip_prefix = "rules_docker-0.16.0",
        urls = ["https://github.com/bazelbuild/rules_docker/releases/download/v0.16.0/rules_docker-v0.16.0.tar.gz"],
    )

    # Rules for interacting with Kubernetes
    # https://github.com/bazelbuild/rules_k8s/releases
    http_archive(
        name = "io_bazel_rules_k8s",
        sha256 = "51f0977294699cd547e139ceff2396c32588575588678d2054da167691a227ef",
        strip_prefix = "rules_k8s-0.6",
        urls = ["https://github.com/bazelbuild/rules_k8s/archive/v0.6.tar.gz"],
    )
