# Publishing Guide for Movement Design System

## 🎉 Version 1.0.0 Released!

The Movement Design System has reached its first stable release (1.0.0). This marks a commitment to:

- **Stable API**: No breaking changes without major version bump
- **Production Ready**: All components tested and documented
- **Semantic Versioning**: Following semver strictly from this point forward
- **Active Maintenance**: Regular updates, bug fixes, and improvements

## ✅ Package Configuration

The design system is configured as a public npm package:

### Package Details
- **Package name**: `@moveindustries/movement-design-system`
- **Current Version**: 1.0.0
- **License**: MIT
- **Repository**: https://github.com/MoveIndustries/movement-design-system
- **Entry points**:
  - ESM: `dist/index.js`
  - CommonJS: `dist/index.cjs`
  - Types: `dist/index.d.ts`

### Build System
- ✅ Vite configured for library mode
- ✅ All components exported from `src/index.ts`
- ✅ External dependencies properly configured
- ✅ Source maps generated
- ✅ Tree-shaking enabled

### Files Included in Package
- `dist/` - Built library files
- `README.md` - Complete documentation

## 🏗️ Building the Library

```bash
# Install dependencies first (if needed)
pnpm install

# Build the library
pnpm build

# Or build with types
pnpm build:lib
```

This will generate:
- `dist/index.js` - ESM bundle (~140kb)
- `dist/index.cjs` - CommonJS bundle (~107kb)
- `dist/index.d.ts` - TypeScript declarations
- Source maps for debugging

## 📦 Testing Locally

Before publishing, test your library locally:

```bash
# 1. Build the library
pnpm build

# 2. Create a tarball
pnpm pack

# 3. In another project, install the tarball
npm install /path/to/moveindustries-movement-design-system-0.1.0.tgz
```

Or use `npm link`:

```bash
# In this project
npm link

# In your test project
npm link @moveindustries/movement-design-system
```

## 📤 Publishing to npm

### First Time Setup

1. **Create npm account** (if you don't have one):
   ```bash
   npm adduser
   ```

2. **Login to npm**:
   ```bash
   npm login
   ```

3. **Verify your login**:
   ```bash
   npm whoami
   ```

### Publishing

```bash
# 1. Update version (choose one)
npm version patch  # 0.1.0 -> 0.1.1
npm version minor  # 0.1.0 -> 0.2.0
npm version major  # 0.1.0 -> 1.0.0

# 2. Build the library
pnpm build:lib

# 3. Publish (scoped packages need --access public flag)
npm publish --access public

# Or for testing, publish to npm with a tag
npm publish --tag beta --access public
```

### Automated Publishing with GitHub Actions

You can set up automated publishing. Create `.github/workflows/publish.yml`:

```yaml
name: Publish Package

on:
  release:
    types: [created]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          registry-url: 'https://registry.npmjs.org'
      - run: pnpm install
      - run: pnpm build:lib
      - run: npm publish --access public
        env:
          NODE_AUTH_TOKEN: ${{secrets.NPM_TOKEN}}
```

## 🔧 Known Issues & Notes

### TypeScript Declarations
The current setup uses `vite-plugin-dts` for generating TypeScript declarations. The generated `index.d.ts` is minimal. For full type inference:

**Option 1**: Users can rely on type inference from the source (modern approach)

**Option 2**: Manually run tsc to generate complete types:
```bash
pnpm build:types
```

**Option 3**: Use a different tool like `tsup` or `rollup-plugin-dts` for better type generation

### CSS/Styles
Currently, styles are expected to be imported by consumers:
```tsx
import '@moveindustries/movement-design-system/styles';
```

Note: The current build doesn't output a `style.css` file. You may want to configure this if needed.

## 📋 Pre-Publish Checklist

### For Every Release

- [ ] Update version in `package.json` using `npm version`
- [ ] Update `CHANGELOG.md` with changes
- [ ] Update `src/Changelog.mdx` to match
- [ ] Run full build: `pnpm build:lib`
- [ ] Run linter: `pnpm lint`
- [ ] Build Storybook: `pnpm build-storybook`
- [ ] Test installation in a separate project using `npm pack`
- [ ] Verify all exports work correctly
- [ ] Review git diff before committing
- [ ] Create git tag matching version: `git tag v1.0.0`
- [ ] Push with tags: `git push --follow-tags`

### For Major Releases Only

- [ ] Write migration guide
- [ ] Update all examples
- [ ] Announce deprecations clearly
- [ ] Test in production apps
- [ ] Update documentation site

### Post-Publish

- [ ] Verify package on npm
- [ ] Test installation: `npm install @moveindustries/movement-design-system@latest`
- [ ] Announce release (if significant)
- [ ] Monitor for issues

## 🔄 Versioning Strategy (Post-1.0)

Now that we've reached 1.0.0, we follow strict [Semantic Versioning](https://semver.org/):

### Version Format: MAJOR.MINOR.PATCH

- **Major (2.0.0, 3.0.0)**: Breaking changes to public API
  - Changed component props
  - Removed exports
  - Changed behavior that apps depend on
  - Requires migration guide
  
- **Minor (1.1.0, 1.2.0)**: New features (backward compatible)
  - New components
  - New props with default values
  - New utilities
  - Enhanced functionality
  
- **Patch (1.0.1, 1.0.2)**: Bug fixes (backward compatible)
  - Bug fixes
  - Documentation updates
  - Performance improvements
  - Internal refactoring

### Examples

```bash
# Bug fix release
npm version patch  # 1.0.0 -> 1.0.1

# New component or feature
npm version minor  # 1.0.0 -> 1.1.0

# Breaking change (avoid if possible)
npm version major  # 1.0.0 -> 2.0.0
```

### Commitment

- **No breaking changes** in minor/patch releases
- **Deprecation warnings** before removing features in major releases
- **Migration guides** for all major version updates
- **Changelog** updated with every release

## 📱 After Publishing

1. **Verify the package**: https://www.npmjs.com/package/@moveindustries/movement-design-system

2. **Test installation**:
   ```bash
   npm install @moveindustries/movement-design-system
   ```

3. **Monitor**:
   - npm download stats
   - GitHub issues
   - User feedback

## 🚀 Next Steps

1. **Documentation Site**: Deploy your Storybook to Netlify/Vercel
   ```bash
   pnpm build-storybook
   # Upload `storybook-static/` folder
   ```

2. **Add Badges** to README:
   - npm version
   - npm downloads
   - Build status
   - License

3. **Continuous Integration**:
   - Set up automated testing
   - Automated builds on PR
   - Automated releases

4. **Improve Type Definitions**:
   - Consider using `tsup` or `rollup-plugin-dts`
   - Ensure all component props are properly typed

## 🎯 1.0 Release Notes

### What Changed in 1.0

The 1.0 release represents the completion of:

1. **Complete Component Library** - 50+ production-ready components
2. **Stable API** - All components follow shadcn/ui patterns
3. **Full TypeScript Support** - Complete type definitions
4. **Comprehensive Documentation** - Storybook with examples
5. **Tailwind CSS v4 Migration** - Modern CSS-first configuration
6. **Production Testing** - Used in Movement Labs applications

### Breaking Changes from 0.x

- Moved styling recipes to `recipes.css` (no manual injection needed)
- Removed CSS string exports (`gradientBorderStyles`, etc.)
- All styles now automatically included when importing design system

### Migration from 0.x to 1.0

If upgrading from 0.x versions:

1. Remove manual style injections from your code
2. Ensure you're importing: `@moveindustries/movement-design-system/component-styles`
3. Continue using class name exports (`gradientBorderClasses`, etc.)
4. Update any beta/experimental API usage

## 📚 Resources

- [npm Publishing Guide](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- [Semantic Versioning](https://semver.org/)
- [npm Scoped Packages](https://docs.npmjs.com/about-scopes)
- [Vite Library Mode](https://vitejs.dev/guide/build.html#library-mode)
- [GitHub Repository](https://github.com/MoveIndustries/movement-design-system)
- [Documentation Site](https://movement-design-system-docs-git-shadcn-movement-labs.vercel.app/)

