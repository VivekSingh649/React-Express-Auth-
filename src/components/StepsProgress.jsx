import { Check } from "lucide-react";

const StepsProgress = ({ steps, currentStep }) => {
  return (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          {/* Step Circle */}
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-full border-2 
              ${
                index < currentStep
                  ? "bg-primary-700 border-primary-500 text-white"
                  : index === currentStep
                  ? "border-white-500 text-white"
                  : "border-gray-300 text-gray-300"
              }`}
          >
            {index < currentStep ? (
              <Check size={16} />
            ) : (
              <span className="text-sm">{index + 1}</span>
            )}
          </div>

          {/* Connector Line */}
          {index < steps.length - 1 && (
            <div
              className={`w-12 h-0.5 mx-2
                ${index < currentStep ? "bg-primary-500" : "bg-gray-300"}`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default StepsProgress;
