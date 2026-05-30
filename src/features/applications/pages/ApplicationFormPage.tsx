import React, { useState } from "react";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { FileUpload } from "@/features/applications/components/FileUpload";
import {
  applySchema,
  type ApplyFormValues,
} from "@/features/applications/schemas/application.schema";
import {
  useAvailableJobs,
  useSubmitApplication,
} from "@/features/applications/api/applications.hooks";

export const ApplicationFormPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const { data: availableJobs, isLoading: jobsLoading } = useAvailableJobs();
  const { mutate: submit, isPending } = useSubmitApplication();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ApplyFormValues>({
    resolver: zodResolver(applySchema),
    defaultValues: {
      full_name: "",
      email: "",
      phone_number: "",
      linkedin_profile: "",
      job_post_id: "",
    },
  });

  const onSubmit: SubmitHandler<ApplyFormValues> = (values) => {
    const formData = new FormData();
    formData.append("full_name", values.full_name);
    formData.append("email", values.email);
    formData.append("phone_number", values.phone_number);
    if (values.linkedin_profile) {
      formData.append("linkedin_profile", values.linkedin_profile);
    }
    formData.append("cv", values.cv);

    submit(
      { jobId: values.job_post_id, data: formData },
      {
        onSuccess: () => {
          setSubmitted(true);
          reset();
        },
      },
    );
  };

  /* ── Job selector options ──────────────────────────────────────── */
  const jobOptions = [
    { value: "", label: "Select a position" },
    ...(availableJobs?.map((j) => ({
      value: String(j.id),
      label: j.title,
    })) ?? []),
  ];

  /* ── Success state ─────────────────────────────────────────────── */
  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#f0f3ff] via-white to-[#f9f9ff] px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center max-w-md mx-auto"
        >
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-emerald-50">
            <CheckCircle2 className="w-8 h-8 text-emerald-500" />
          </div>
          <h2 className="text-2xl font-bold text-[#111c2d] tracking-tight mb-2">
            Application Submitted!
          </h2>
          <p className="text-sm text-[#54647a] mb-8 leading-relaxed">
            Thank you for your interest. We've received your application and
            will review it shortly. You'll receive a confirmation email soon.
          </p>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#0058bc] hover:text-[#0070eb] transition-colors"
          >
            Submit another application
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    );
  }

  /* ── Form ───────────────────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f0f3ff] via-white to-[#f9f9ff] flex items-start justify-center px-4 py-10 sm:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-[680px] bg-white rounded-2xl shadow-[0_4px_40px_rgba(0,0,0,0.06)] border border-[#e2e8f0]/60 overflow-hidden"
      >
        {/* ── Header ─────────────────────────────────────────────── */}
        <div className="px-8 pt-10 pb-6 border-b border-[#e2e8f0]/60">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-center"
            style={{ color: '#0058bc', fontWeight: 'bold' }}
          >
            Hireflow
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="text-sm md:text-base text-[#54647a] max-w-lg mx-auto leading-relaxed text-center"
            style={{ textWrap: 'balance' }}
          >
            At HireFlow, we bring together curious thinkers and passionate builders to create scalable solutions that transform the way organizations discover and hire talent.
          </motion.p>
        </div>

        {/* ── Form body ──────────────────────────────────────────── */}
        <form onSubmit={handleSubmit(onSubmit)} className="px-8 py-8 space-y-8">
          {/* — Personal Information — */}
          <fieldset>
            <legend className="text-[13px] font-bold tracking-[0.15em] uppercase text-[#414755] mb-5">
              Personal Information
            </legend>

            <div className="space-y-5">
              <Input
                id="full_name"
                label="Full Name"
                placeholder="Jane Doe"
                error={errors.full_name?.message}
                {...register("full_name")}
              />

              <Select
                id="job_post_id"
                label="Applying for Job"
                options={
                  jobsLoading
                    ? [{ value: "", label: "Loading positions..." }]
                    : jobOptions
                }
                error={errors.job_post_id?.message}
                {...register("job_post_id")}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Input
                  id="email"
                  type="email"
                  label="Email Address"
                  placeholder="jane.doe@example.com"
                  error={errors.email?.message}
                  {...register("email")}
                />
                <Input
                  id="phone_number"
                  type="tel"
                  label="Phone Number"
                  placeholder="+1 (555) 000-0000"
                  error={errors.phone_number?.message}
                  {...register("phone_number")}
                />
              </div>

              <Input
                id="linkedin_profile"
                label="LinkedIn Profile (Optional)"
                placeholder="https://linkedin.com/in/janedoe"
                error={errors.linkedin_profile?.message}
                {...register("linkedin_profile")}
              />
            </div>
          </fieldset>

          {/* — Resume / CV — */}
          <fieldset>
            <legend className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#414755] mb-5">
              Resume / CV
            </legend>

            <Controller
              name="cv"
              control={control}
              render={({ field }) => (
                <FileUpload
                  id="cv"
                  value={field.value ?? null}
                  onChange={(file) => field.onChange(file)}
                  error={errors.cv?.message}
                />
              )}
            />
          </fieldset>

          {/* — Submit — */}
          <div className="pt-2 flex flex-col items-center gap-4">
            <motion.button
              type="submit"
              disabled={isPending}
              whileTap={isPending ? undefined : { scale: 0.97 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className={`
                inline-flex items-center justify-center gap-2 w-full sm:w-auto
                px-8 py-3.5 rounded-xl text-sm font-bold tracking-wide
                transition-colors duration-200 outline-none
                focus:ring-4 focus:ring-[#0058bc]/15 select-none
                ${
                  isPending
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-[#0058bc] text-white hover:bg-[#004a9e]"
                }
              `}
            >
              <AnimatePresence mode="wait">
                {isPending ? (
                  <motion.span
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Submitting...
                  </motion.span>
                ) : (
                  <motion.span
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    Submit Application
                    <ArrowRight className="w-4 h-4" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            <p className="text-xs text-[#717786]">
              By submitting this application, you agree to our{" "}
              <a
                href="#"
                className="text-[#0058bc] font-semibold hover:underline"
                onClick={(e) => e.preventDefault()}
              >
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ApplicationFormPage;
