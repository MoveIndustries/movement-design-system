import { createToaster } from "./Toaster";

// Create a global toast instance
const [GlobalToaster, globalToast] = createToaster();

export { GlobalToaster, globalToast as toast };
