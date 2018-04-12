# Library support in Angular CLI 6

Angular CLI v6 comes with library support via `ng-packagr` plugged into the build system we use in
Angular CLI, together with schematics for generating a library.

## Generating a library

You can create a library in a existing v6 project by running the following commands:

```
ng generate library my-lib
npm install
```

Note: we're working on removing the need for `npm install` after generating the
library (https://github.com/angular/angular-cli/issues/10216).

You should now have a library inside `projects/my-lib`.
It contains a component and a service inside a NgModule.

## Building your library

You can build this library via `ng build my-lib`, and also unit test it and lint it by replacing
`build` with `test` or `lint`.

This also has the side effect of changing how `ng build` and similar commands works.
Since now you have two projects that can be built, both will be built when you run `ng build`.
If you only want to build one, you must specify which one you want to build on the command.

So if your main application was called `my-app`, and you build it with `ng build` before, now
you must run `ng build my-app` to only build that one.

## Using your library inside your apps

Before you use your library, it's important to understand the mental model of how libraries are
used in general.

When you want to use a library from `npm`, you must:

* install the library into node_modules via `npm install library-name`
* import it in your application by name `import { something } from 'library-name';`

This works because importing a library in Angular CLI looks for a mapping between library name
and location on disk.

Angular CLI first looks in your tsconfig paths, then in the node_modules folder.

When you build your own libraries it doesn't go into node_modules so we use the tsconfig paths
to tell the build system where it is.
Generating a library automatically adds its path to the tsconfig file.

Using your own library follows a similar pattern:

* build the library via `ng build my-lib`
* import it in your application by name `import { something } from 'my-lib';`

It's important to note that your app can never use your library before it is built.

For instance, if you clone your git repository again, and run `npm install`, your editor will show
the `my-lib` imports as missing.
This is because you haven't yet built your library.

Another common problem is changes to your library not being reflected in your app.
This is often because your app is using an old build of your library.
If this happens just rebuild your library.

## Publishing your library

To publish your library follow these steps:

```
ng build my-lib --prod
cd dist/my-lib
npm publish
```

If you've never published a package in npm before, you will need to create a user account.
You can read more about publishing on npm here:
https://docs.npmjs.com/getting-started/publishing-npm-packages

The `--prod` flag should be used when building to publish because it will completely clean the build
directory for the library beforehand, which removes old code leftover code from previous versions.

## Why do I need to build the library everytime I make changes?

Running `ng build my-lib` every time you change a file is bothersome and takes time.

Some similar setups instead add the path to the source code directly inside tsconfig.
This makes seeing changes in your app faster.

But doing that is risky.
When you do that, the build system for your app is building the library as well.
But your library is built using a different build system than your app.

Those two build systems can build things slightly different, or support completely different
features.

This leads to subtle bugs where your published library behaves differently from the one in your
development setup.

For this reason we decided to err on the side of caution, and make the recommended usage
the safe one.

In the future we want to add watch support to building libraries so it is faster to see changes.

We are also planning to add internal dependency support to Angular CLI.
This means that Angular CLI would know your app depends on your library, and automatically rebuilds
the library when the app needs it.
