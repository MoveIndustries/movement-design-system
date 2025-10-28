# Publishing Guide for Movement Design System

## ✅ What's Been Configured

Your design system is now set up as an installable npm package with the following configuration:

### Package Configuration
- **Package name**: `@movementlabsxyz/movement-design-system`
- **Version**: 0.1.0
- **License**: MIT
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
npm install /path/to/movementlabsxyz-movement-design-system-0.1.0.tgz
```

Or use `npm link`:

```bash
# In this project
npm link

# In your test project
npm link @movementlabsxyz/movement-design-system
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
import '@movementlabsxyz/movement-design-system/styles';
```

Note: The current build doesn't output a `style.css` file. You may want to configure this if needed.

## 📋 Pre-Publish Checklist

- [x] Package.json configured with correct name and version
- [x] Build completes successfully (`pnpm build`)
- [x] README.md includes installation and usage instructions
- [x] .npmignore excludes unnecessary files
- [ ] Test installation in a separate project
- [ ] Verify all exports work correctly
- [ ] Add repository URL to package.json
- [ ] Set up CI/CD for automated publishing (optional)
- [ ] Add changelog for version tracking
- [ ] Consider adding semantic-release or changesets

## 🔄 Versioning Strategy

Follow [Semantic Versioning](https://semver.org/):

- **Major (1.0.0)**: Breaking changes
- **Minor (0.1.0)**: New features (backward compatible)
- **Patch (0.0.1)**: Bug fixes (backward compatible)

## 📱 After Publishing

1. **Verify the package**: https://www.npmjs.com/package/@movementlabsxyz/movement-design-system

2. **Test installation**:
   ```bash
   npm install @movementlabsxyz/movement-design-system
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

## 📚 Resources

- [npm Publishing Guide](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- [Semantic Versioning](https://semver.org/)
- [npm Scoped Packages](https://docs.npmjs.com/about-scopes)
- [Vite Library Mode](https://vitejs.dev/guide/build.html#library-mode)

