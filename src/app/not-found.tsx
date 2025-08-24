"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Home, 
  Construction,
  AlertCircle
} from "lucide-react";
import { useRouter } from 'next/navigation';

const NotFoundPage = () => {
  const router = useRouter();

  const handleGoBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/login');
    }
  };

  const handleGoHome = () => {
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
              <Construction className="h-8 w-8 text-yellow-600" />
            </div>
            <CardTitle className="text-2xl text-gray-900">Page Not Found</CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="text-center space-y-4">
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                <AlertCircle className="h-4 w-4 mr-1" />
                Under Development
              </Badge>
              
              <p className="text-gray-600">
                The page you are looking for are still under developement
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <Button 
                onClick={handleGoBack}
                variant="outline"
                className="w-full"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back Previous Page
              </Button>
              
              <Button 
                onClick={handleGoHome}
                className="w-full"
              >
                <Home className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-500">
                Error Code: <span className="font-mono">404</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NotFoundPage;