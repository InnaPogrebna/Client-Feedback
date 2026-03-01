"use client";

import React, { useState } from "react";
import {
  Send,
  MessageSquare,
  User,
  Mail,
  Zap,
  CheckCircle2,
  Loader2,
  BarChart3
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL;

export default function SupportPage() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [priority, setPriority] = useState("normal");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const formValues = Object.fromEntries(formData);

    const data = {
      ...formValues,
      priority: priority,
      submittedAt: new Date().toISOString(),
    };


    try {
      // REPLACE WITH YOUR ACTUAL N8N WEBHOOK TEST URL
      if (!N8N_WEBHOOK_URL) {
        throw new Error("N8N_WEBHOOK_URL is not configured");
      }
      await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      setSent(true);
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
        <Card className="w-full max-w-md text-center animate-in fade-in zoom-in duration-300 shadow-2xl border-none">
          <CardHeader>
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle2 className="h-12 w-12 text-primary" />
            </div>
            <CardTitle className="text-3xl font-bold tracking-tight text-slate-900">Request Received</CardTitle>
            <CardDescription className="text-base pt-2">
              Thank you for reaching out. Our automated system has logged your request and our team will be in touch shortly.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={() => setSent(false)} variant="outline" className="w-full border-slate-200 hover:bg-slate-50">
              Submit Another Request
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f8fafc] p-4 font-sans selection:bg-primary/10">
      <Card className="w-full max-w-xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border-slate-200/60 bg-white/90 backdrop-blur-xl">
        <CardHeader className="space-y-1.5 pb-8">
          <div className="flex items-center gap-2 text-primary mb-3">
            <div className="p-1.5 rounded-md bg-primary/10">
              <Zap className="h-4 w-4 fill-primary" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Enterprise Support</span>
          </div>
          <CardTitle className="text-4xl font-black tracking-tight text-slate-900">Client Feedback</CardTitle>
          <CardDescription className="text-slate-500 text-base leading-relaxed">
            Submit your inquiry below. Our intelligent workflow engine will route your message to the appropriate department.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="grid gap-8">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="grid gap-2.5">
                <Label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-slate-500">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input id="name" name="name" placeholder="John Doe" required className="pl-10 h-11 bg-slate-50/50 border-slate-200 focus:bg-white transition-all" />
                </div>
              </div>
              <div className="grid gap-2.5">
                <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-slate-500">Business Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input id="email" name="email" type="email" placeholder="john@company.com" required className="pl-10 h-11 bg-slate-50/50 border-slate-200 focus:bg-white transition-all" />
                </div>
              </div>
            </div>

            <div className="grid gap-2.5">
              <Label htmlFor="priority" className="text-xs font-semibold uppercase tracking-wider text-slate-500">Priority Level</Label>
              <Select name="priority" value={priority} onValueChange={setPriority} defaultValue="normal">
                <SelectTrigger className="h-11 bg-slate-50/50 border-slate-200">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-slate-400" />
                    <SelectValue placeholder="Select priority" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low - General Inquiry</SelectItem>
                  <SelectItem value="normal">Normal - Support Request</SelectItem>
                  <SelectItem value="high">High - Urgent Issue</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2.5">
              <Label htmlFor="message" className="text-xs font-semibold uppercase tracking-wider text-slate-500">Inquiry Details</Label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Textarea
                  id="message"
                  name="message"
                  placeholder="How can we assist you today?"
                  className="min-h-[140px] pl-10 pt-2.5 bg-slate-50/50 border-slate-200 focus:bg-white resize-none transition-all"
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-4">
            <Button className="w-full h-14 text-lg font-bold shadow-lg shadow-primary/20 transition-all active:scale-[0.98]" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Transmit Request <Send className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}