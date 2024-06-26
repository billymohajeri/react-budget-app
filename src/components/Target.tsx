import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState, useEffect } from "react";

type TargetProps = {
  transferToSavingAmount: number;
};

const targetSchema = z.object({
  targetAmount: z
    .number()
    .min(1, "Target amount must be greater than zero"),
});

type TargetFormValues = {
  targetAmount: number;
};

const Target = (props: TargetProps) => {
  const {
    register,
    setValue,
    setError,
    clearErrors,
    watch,
    reset,
    formState: { errors },
  } = useForm<TargetFormValues>({
    resolver: zodResolver(targetSchema),
  });

  const [target, setTarget] = useState(0);

  const watchedTargetAmount = watch("targetAmount", target);

  useEffect(() => {
    try {
      targetSchema.parse({ targetAmount: watchedTargetAmount });
      clearErrors("targetAmount");
      setTarget(watchedTargetAmount);
    } catch (e) {
      if (e instanceof z.ZodError) {
        setError("targetAmount", { message: e.errors[0]?.message });
      }
    }
  }, [watchedTargetAmount, clearErrors, setError]);

  const handleTargetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    if (!isNaN(value)) {
      setValue("targetAmount", value, { shouldValidate: true });
    }
  };

  const handleReset = () => {
    setTarget(0);
    reset();
  };

  const progress = target ? (props.transferToSavingAmount / target) * 100 : 0;

  return (
    <>
      <p className="h2">Target</p>
      <form>
        <label htmlFor="targetAmount" className="form-label mt-5">
          Set target
        </label>
        <div className="input-group mb-3">
          <span className="input-group-text">€</span>
          <input
            type="number"
            id="targetAmount"
            {...register("targetAmount", { valueAsNumber: true })}
            className="form-control"
            aria-label="Amount (to the nearest euro)"
            min={0}
            onChange={handleTargetChange}
          />
          <span className="input-group-text">.00</span>
        </div>
        {errors.targetAmount && (
          <span className="text-danger">{errors.targetAmount.message}</span>
        )}

        <button
          type="button"
          className="btn btn-outline-danger mt-2 ms-2"
          onClick={handleReset}
        >
          Reset
        </button>
      </form>
      <p className="mt-5">Current saving: {props.transferToSavingAmount} EUR</p>
      <p className="mt-2">Target: {target} EUR</p>
      <p className="mt-0">Progress: {progress.toFixed(0)}%</p>
      <div
        className="progress"
        role="progressbar"
        aria-label="Savings progress"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="progress-bar progress-bar-striped progress-bar-animated"
          style={{ width: `${progress}%` }}
        >
          {progress.toFixed(0)}%
        </div>
      </div>
    </>
  );
};

export default Target;
