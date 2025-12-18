"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
// import { Separator } from "@/components/ui/separator"
import { CheckCircle2 } from "lucide-react"
import Link from "next/link"

export default function PaymentSuccessPage() {
  const paymentDetails = {
    transactionId: "TXN" + Math.random().toString(36).substring(2, 11).toUpperCase(),
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
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardContent className="pt-6">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-green-50 p-3">
              <CheckCircle2 className="h-16 w-16 text-green-600" />
            </div>
          </div>

          {/* Success Message */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-semibold text-foreground mb-2">Payment Successful!</h1>
            <p className="text-muted-foreground">Your payment has been processed successfully</p>
          </div>

          {/* <Separator className="my-6" /> */}

          {/* Payment Details */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Status</span>
              <Badge variant="default" className="bg-green-600 hover:bg-green-700">
                Completed
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Transaction ID</span>
              <span className="text-sm font-mono font-medium">{paymentDetails.transactionId}</span>
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
                <span className="text-sm font-medium">₹{paymentDetails.amount.toLocaleString()}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">GST (18%)</span>
                <span className="text-sm font-medium">₹{paymentDetails.gst.toLocaleString()}</span>
              </div>

              {/* <Separator className="my-3" /> */}

              <div className="flex items-center justify-between">
                <span className="font-semibold">Total Paid</span>
                <span className="text-lg font-bold text-primary">₹{paymentDetails.total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 mt-8">
            <Button size="lg" className="w-full">
              Download Receipt
            </Button>
            <Link href="/" className="w-full">
              <Button variant="outline" size="lg" className="w-full bg-transparent">
                Back to Home
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
