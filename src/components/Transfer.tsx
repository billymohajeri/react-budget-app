import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect } from "react";

type TransferProps = {
  totalIncomeAmount: number;
  totalExpenseAmount: number;
  onGetTransferToSavingAmount: (amount: number) => void;
};

const transferSchema = z.object({
  transferAmount: z
    .number()
    .min(1, "Transfer amount must be greater than zero")
    .nonnegative("Transfer amount can't be negative"),
});

type TransferFormValues = {
  transferAmount: number;
};

const Transfer = (props: TransferProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    watch,
    reset,
    formState: { errors },
  } = useForm<TransferFormValues>({
    resolver: zodResolver(transferSchema),
    defaultValues: { transferAmount: 0 },
  });

  const watchedTransferAmount = watch("transferAmount", 0);

  useEffect(() => {
    try {
      transferSchema.parse({ transferAmount: watchedTransferAmount });
      clearErrors("transferAmount");
    } catch (e) {
      if (e instanceof z.ZodError) {
        setError("transferAmount", { message: e.errors[0]?.message });
      }
    }
  }, [watchedTransferAmount, clearErrors, setError]);

  const onSubmit = (data: TransferFormValues) => {
    props.onGetTransferToSavingAmount(data.transferAmount);
    reset({ transferAmount: 0 }); 
  };

  return (
    <div className="balance-container">
      <p className="h2">Balance</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className="form-label mt-5">
          Current balance: {props.totalIncomeAmount - props.totalExpenseAmount}
        </p>
        <label htmlFor="transferAmount" className="form-label mt-3">
          Transfer to saving account
        </label>
        <div className="input-group mb-3" id="balance-input">
          <span className="input-group-text">€</span>
          <input
            type="number"
            id="transferAmount"
            {...register("transferAmount", { valueAsNumber: true })}
            className="form-control"
            aria-label="Amount (to the nearest euro)"
            min={0}
          />
          <span className="input-group-text">.00</span>
        </div>
        {errors.transferAmount && (
          <span className="text-danger">{errors.transferAmount.message}</span>
        )}
        <button type="submit" className="btn btn-primary mb-5">
          Transfer
        </button>
      </form>
    </div>
  );
};

export default Transfer;
