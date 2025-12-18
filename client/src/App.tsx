import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import AdminLayout from "./components/AdminLayout";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import FiqihMaterials from "./pages/FiqihMaterials";
import SubmitQuestion from "./pages/SubmitQuestion";
import MyQuestion from "./pages/MyQuestion";
import Contact from "./pages/Contact";
import AboutUs from "./pages/AboutUs";
import Register from "./pages/Register";
import UserLogin from "./pages/UserLogin";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminQuestions from "./pages/admin/Questions";
import AdminCategories from "./pages/admin/Categories";

import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/lokasi" component={Contact} />
      <Route path="/kontak" component={Contact} />

      <Route path="/tentang-kami" component={AboutUs} /> {/* Redirect old URL */}
      <Route path="/user/register" component={Register} />
      <Route path="/user/login" component={UserLogin} />
      <Route path="/dashboard" component={UserDashboard} />
      <Route path="/login" component={Login} />
      <Route path="/materi-fiqih" component={FiqihMaterials} />
      <Route path="/kebijakan-privasi" component={PrivacyPolicy} />
      <Route path="/syarat-ketentuan" component={TermsOfService} />

      <Route path="/submit-question" component={SubmitQuestion} />
      <Route path="/my-question/:token" component={MyQuestion} />
      
      {/* Admin Routes */}
      <Route path="/admin">
        {() => (
          <AdminLayout>
            <AdminDashboard />
          </AdminLayout>
        )}
      </Route>
      <Route path="/admin/questions">
        {() => (
          <AdminLayout>
            <AdminQuestions />
          </AdminLayout>
        )}
      </Route>
      <Route path="/admin/categories">
        {() => (
          <AdminLayout>
            <AdminCategories />
          </AdminLayout>
        )}
      </Route>
      
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
