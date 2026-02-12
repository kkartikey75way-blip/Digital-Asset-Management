import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRenewAssetMutation } from "../../services/renewalApi";
import InputField from "../ui/InputField";
import Button from "../ui/Button";
import { showSuccess, showError } from "../../utils/toast";

const renewalSchema = z.object({
    cost: z.number().min(0, "Cost must be positive"),
});

type RenewalFormData = z.infer<typeof renewalSchema>;

interface RenewalFormProps {
    assetId: string;
}

const RenewalForm = ({ assetId }: RenewalFormProps) => {
    const [renewAsset, { isLoading }] =
        useRenewAssetMutation();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<RenewalFormData>({
        resolver: zodResolver(renewalSchema),
    });

    const onSubmit = async (data: RenewalFormData) => {
        try {
            await renewAsset({
                assetId,
                cost: data.cost,
            }).unwrap();

            showSuccess("Asset renewed successfully");
            reset();
        } catch {
            showError("Failed to renew asset");
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-3"
        >
            <InputField
                label="Renewal Cost"
                type="number"
                registration={register("cost", {
                    valueAsNumber: true,
                })}
                error={errors.cost?.message}
            />

            <Button
                type="submit"
                label="Renew Asset"
                loading={isLoading}
            />
        </form>
    );
};

export default RenewalForm;
