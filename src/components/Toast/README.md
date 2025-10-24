# Toast Usage Guide

## Global Toast Setup

To use the global toast system, you only need to set up the `GlobalToaster` once in your app root, then you can use the `toast` function anywhere in your application.

### 1. Setup in App Root

Add the `GlobalToaster` component to your app root (usually in your main App component or layout):

```tsx
import { GlobalToaster } from "@movementlabsxyz/movement-design-system";

function App() {
  return (
    <div>
      {/* Your app content */}
      <YourAppContent />
      
      {/* Add this once at the root level */}
      <GlobalToaster />
    </div>
  );
}
```

### 2. Using Toast Anywhere

Once the `GlobalToaster` is set up, you can use the `toast` function anywhere in your app:

```tsx
import { toast } from "@movementlabsxyz/movement-design-system";

function MyComponent() {
  const handleSuccess = () => {
    // Simple string usage
    toast.success("Your action was completed successfully!");
    
    // Or with full options
    toast.success({
      title: "Success!",
      description: "Your action was completed successfully.",
    });
  };

  const handleError = () => {
    // Simple string usage
    toast.error("Something went wrong!");
    
    // Or with full options
    toast.error({
      title: "Error",
      description: "Something went wrong. Please try again.",
    });
  };

  const handleInfo = () => {
    // Simple string usage
    toast.info("Here's some useful information.");
    
    // Or with full options
    toast.info({
      title: "Information",
      description: "Here's some useful information.",
    });
  };

  const handleWarning = () => {
    // Simple string usage
    toast.warning("Please be careful with this action.");
    
    // Or with full options
    toast.warning({
      title: "Warning",
      description: "Please be careful with this action.",
    });
  };

  return (
    <div>
      <button onClick={handleSuccess}>Show Success Toast</button>
      <button onClick={handleError}>Show Error Toast</button>
      <button onClick={handleInfo}>Show Info Toast</button>
      <button onClick={handleWarning}>Show Warning Toast</button>
    </div>
  );
}
```

### 3. Advanced Usage

#### Dismissing Toasts

```tsx
import { toast } from "@movementlabsxyz/movement-design-system";

function MyComponent() {
  const showToast = () => {
    toast.info({
      id: "my-toast", // Optional: provide an ID
      title: "Loading...",
      description: "This toast can be dismissed programmatically.",
    });

    // Dismiss after 3 seconds
    setTimeout(() => {
      toast.dismiss("my-toast");
    }, 3000);
  };

  return <button onClick={showToast}>Show Dismissible Toast</button>;
}
```

#### Dismissing All Toasts

```tsx
import { toast } from "@movementlabsxyz/movement-design-system";

function MyComponent() {
  const dismissAll = () => {
    toast.dismiss(); // Dismisses all toasts
  };

  return <button onClick={dismissAll}>Dismiss All Toasts</button>;
}
```

#### Custom Duration

```tsx
import { toast } from "@movementlabsxyz/movement-design-system";

function MyComponent() {
  const showLongToast = () => {
    toast.info({
      title: "Long Duration",
      description: "This toast will stay for 10 seconds.",
      duration: 10000, // 10 seconds
    });
  };

  const showPersistentToast = () => {
    toast.warning({
      title: "Persistent",
      description: "This toast will stay until manually dismissed.",
      duration: Infinity, // Never auto-dismiss
    });
  };

  return (
    <div>
      <button onClick={showLongToast}>Show Long Toast</button>
      <button onClick={showPersistentToast}>Show Persistent Toast</button>
    </div>
  );
}
```

## Toast Variants

The toast system supports four variants:

- `success` - Green background for successful actions
- `error` - Red background for errors
- `warning` - Yellow background for warnings  
- `info` - Blue background for informational messages

## Toast API

### Method-based Usage

```tsx
// Simple string usage (title will be empty)
toast.success("Your action was completed!");
toast.error("Something went wrong!");
toast.warning("Please check your input");
toast.info("New feature available!");

// Full options usage
toast.success({
  title: "Success!",
  description: "Your action was completed successfully.",
  id: "optional-id",
  duration: 5000
});
```

### Toast Props

```tsx
interface CreateToastArgs {
  title?: string;
  description?: string;
  id?: string; // Optional: for programmatic control
  duration?: number; // Optional: in milliseconds, defaults to 5000
}
```

## Best Practices

1. **Set up once**: Only add `GlobalToaster` once at your app root
2. **Use appropriate variants**: Choose the right variant for the message type
3. **Keep messages concise**: Toast messages should be brief and clear
4. **Provide context**: Include both title and description when helpful
5. **Handle errors gracefully**: Use error toasts for user-facing error messages
6. **Don't overuse**: Avoid showing too many toasts at once
