import { fetch, FetchResponse } from "../utils/dataAccess";
import { Center } from "../types/Center";

export const getAllCenters = async (): Promise<Center[]> => {
  const response: FetchResponse<{ "hydra:member": Center[] }> | undefined = await fetch<{ "hydra:member": Center[] }>("/centers");

  if (response && response.data && "hydra:member" in response.data) {
    return response.data["hydra:member"];
  } else {
    return []; // Retourne un tableau vide si la réponse est indéfinie ou incorrecte
  }
};
