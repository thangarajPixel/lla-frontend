"use client";

import { XCircle } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function PaymentFailedPage() {
  const paymentDetails = {
    transactionId: `TXN${Math.random().toString(36).substring(2, 11).toUpperCase()}`,
    date: new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    time: new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    amount: 1500,
    gst: 270,
    total: 1770,
    reason: "Insufficient funds",
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardContent className="pt-6">
          {/* Error Icon */}
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-red-50 p-3">
              <XCircle className="h-16 w-16 text-red-600" />
            </div>
          </div>

          {/* Error Message */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-semibold text-foreground mb-2">
              Payment Failed
            </h1>
            <p className="text-muted-foreground">
              We couldn't process your payment
            </p>
          </div>

          {/* <Separator className="my-6" /> */}

          {/* Payment Details */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Status</span>
              <Badge
                variant="destructive"
                className="bg-red-600 hover:bg-red-700"
              >
                Failed
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Reason</span>
              <span className="text-sm font-medium text-red-600">
                {paymentDetails.reason}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Transaction ID
              </span>
              <span className="text-sm font-mono font-medium">
                {paymentDetails.transactionId}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Date</span>
              <span className="text-sm font-medium">{paymentDetails.date}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Time</span>
              <span className="text-sm font-medium">{paymentDetails.time}</span>
            </div>

            {/* <Separator className="my-4" /> */}

            {/* Amount Breakdown */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Amount</span>
                <span className="text-sm font-medium">
                  ₹{paymentDetails.amount.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">GST (18%)</span>
                <span className="text-sm font-medium">
                  ₹{paymentDetails.gst.toLocaleString()}
                </span>
              </div>

              {/* <Separator className="my-3" /> */}

              <div className="flex items-center justify-between">
                <span className="font-semibold">Total Amount</span>
                <span className="text-lg font-bold text-muted-foreground">
                  ₹{paymentDetails.total.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 mt-8">
            <Link href="/" className="w-full">
              <Button size="lg" className="w-full">
                Try Again
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="w-full bg-transparent"
            >
              Contact Support
            </Button>
            <Link href="/" className="w-full">
              <Button variant="ghost" size="lg" className="w-full">
                Back to Home
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
