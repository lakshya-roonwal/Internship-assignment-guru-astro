import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useEffect, useState ,useRef} from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { FormDataSchema } from "./lib/schema";
import StepNavigation from "./components/StepNavigation";
import Spinner from "./components/Spinner";

type Inputs = z.infer<typeof FormDataSchema>;

const steps = [
  {
    id: "Step 1",
    name: "Personal Information",
    fields: ["name", "email", "phone"],
  },
  {
    id: "Step 2",
    name: "Address Information",
    fields: ["address1", "address2", "city", "state", "zip"],
  },
  { id: "Step 3", name: "Confirmation" },
];

const App = () => {
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const delta = currentStep - previousStep;

  const {
    register,
    handleSubmit,
    reset,
    watch,
    trigger,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(FormDataSchema),
  });

  const formData = watch(); // Watch the entire form data
  const isSubmitting = useRef(false);

  // Load form data from local storage on component mount
  useEffect(() => {
    const savedFormData = localStorage.getItem("formData");
    if (savedFormData) {
      reset(JSON.parse(savedFormData));
    }
  }, [reset]);

  // Save form data to local storage whenever it changes
  useEffect(() => {
    if (!isSubmitting.current) {
      localStorage.setItem("formData", JSON.stringify(formData));
    }
  }, [formData]);

  const next = async () => {
    if (currentStep === 0) {
      const output = await trigger(["name", "email", "phone"], {
        shouldFocus: true,
      });
      if (!output) return;
    }
    if (currentStep === 1) {
      const output = await trigger([
        "address1",
        "address2",
        "city",
        "state",
        "zip",
      ], {
        shouldFocus: true,
      });
      if (!output) return;
    }
    if (currentStep === 2) {
      return;
    }

    setPreviousStep(currentStep);
    setCurrentStep((step) => step + 1);
  };

  const prev = () => {
    if (currentStep === 0) {
      return; 
    }
    setPreviousStep(currentStep);
    setCurrentStep((step) => step - 1);
  };

  const submitForm = (data: Inputs) => {
    if (currentStep === 2) {
      console.log(data);
      isSubmitting.current = true;
      setIsLoading(true); // Set loading state to true
  
      // Simulate an API call with setTimeout
      setTimeout(() => {
        localStorage.removeItem("formData");
        reset(); // Reset form data
        isSubmitting.current = false;
        setIsLoading(false); 
        // Navigating to Thank you page
        navigate('/thankyou')
      }, 2000);
    }
  };

  return (
    <div className="absolute inset-0 flex flex-col justify-between p-24">
      <StepNavigation currentStep={currentStep} steps={steps}/>
      <form className="mt-12 py-12" onSubmit={handleSubmit(submitForm)}>
      {currentStep === 0 && (
          <motion.div
            initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Personal Information
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Provide your personal details.
            </p>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="name"
                    {...register("name")}
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  />
                  {errors.name?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.name.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email
                </label>
                <div className="mt-2">
                  <input
                    type="email"
                    id="email"
                    {...register("email")}
                    autoComplete="email"
                    className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  />
                  {errors.email?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Phone
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="phone"
                    {...register("phone")}
                    autoComplete="tel"
                    className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  />
                  {errors.phone?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {currentStep === 1 && (
          <motion.div
            initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Address Information
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Provide your address details.
            </p>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="address1"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Address Line 1
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="address1"
                    {...register("address1")}
                    autoComplete="address-line1"
                    className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  />
                  {errors.address1?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.address1.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="address2"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Address Line 2
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="address2"
                    {...register("address2")}
                    autoComplete="address-line2"
                    className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  />
                  {errors.address2?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.address2.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  City
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="city"
                    {...register("city")}
                    autoComplete="address-level2"
                    className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  />
                  {errors.city?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.city.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="state"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  State
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="state"
                    {...register("state")}
                    autoComplete="address-level1"
                    className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  />
                  {errors.state?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.state.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="zip"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  ZIP Code
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="zip"
                    {...register("zip")}
                    autoComplete="postal-code"
                    className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  />
                  {errors.zip?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.zip.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {currentStep === 2 && (
          <motion.div
            initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Confirmation
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Confirm your details before submitting.
            </p>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <p className="block text-sm font-medium leading-6 text-gray-900">
                  Name: {watch("name")}
                </p>
                <p className="block text-sm font-medium leading-6 text-gray-900">
                  Email: {watch("email")}
                </p>
                <p className="block text-sm font-medium leading-6 text-gray-900">
                  Phone: {watch("phone")}
                </p>
                <p className="block text-sm font-medium leading-6 text-gray-900">
                  Address Line 1: {watch("address1")}
                </p>
                <p className="block text-sm font-medium leading-6 text-gray-900">
                  Address Line 2: {watch("address2")}
                </p>
                <p className="block text-sm font-medium leading-6 text-gray-900">
                  City: {watch("city")}
                </p>
                <p className="block text-sm font-medium leading-6 text-gray-900">
                  State: {watch("state")}
                </p>
                <p className="block text-sm font-medium leading-6 text-gray-900">
                  ZIP: {watch("zip")}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        <div className="flex justify-end mt-6">
          <button
            type="button"
            onClick={prev}
            disabled={currentStep === 0}
            className="rounded-md bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-300"
          >
            Previous
          </button>
          {currentStep < steps.length - 1 && (
            <button
              type="button"
              onClick={next}
              className="ml-4 rounded-md bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700"
            >
              Next
            </button>
          )}
          {currentStep === steps.length - 1 && (
            <button
            type="submit"
            className={`ml-auto inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
              isLoading ? 'bg-gray-400' : 'bg-sky-600 hover:bg-sky-700'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500`}
            disabled={isLoading}
          >
            Submit {isLoading && <Spinner />}
          </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default App;
