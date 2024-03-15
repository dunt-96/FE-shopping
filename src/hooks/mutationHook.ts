import { useMutation } from "@tanstack/react-query";

export const useMutationHook = (fnCallBack: any) => {
    const mutation = useMutation<Record<string, any>, {}, {}>(
        {
            mutationFn: (data: Record<string, any>) => fnCallBack(data)
        }
    );

    return mutation;
}