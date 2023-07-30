import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import { platformThemeRegistryAbi } from 'abi/platformThemeRegistryAbi';

export function useSetRegistry() {

  const { config, error } = usePrepareContractWrite({
    address: "0x9a23AE640040e4d34E9e00E500003000017144F4", // deterministic address of theme registry
    abi: platformThemeRegistryAbi,
    functionName: 'newPlatformIndex',
    args: ["0x153D2A196dc8f1F6b9Aa87241864B3e4d4FEc170", "ipfsURI/"]
  });

  const {
    write: writeSetRegistry,
    data,
    error: writeError,
    isError,
    isLoading,
    isSuccess,
    status,
  } = useContractWrite(config);

  // Wait for data from setRegistry call
  const { data: setRegistryData, isLoading: setRegistryLoading } =
    useWaitForTransaction({
      hash: data?.hash,
    });

  return {
    config,
    error,
    writeSetRegistry,
    writeError,
    data,
    isError,
    isLoading,
    isSuccess,
    status,
    setRegistryData,
    setRegistryLoading,
  };
}

export default useSetRegistry;