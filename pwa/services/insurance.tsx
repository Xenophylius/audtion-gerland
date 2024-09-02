import { fetch, FetchResponse } from "../utils/dataAccess";
import { Insurance } from "../types/Insurance";

export const getAllInsurances = async (): Promise<Insurance[]> => {
  const response: FetchResponse<{ "hydra:member": Insurance[] }> | undefined = await fetch<{ "hydra:member": Insurance[] }>("/insurances");

  // Vérifier si la réponse est définie et contient "hydra:member"
  if (response && response.data && "hydra:member" in response.data) {
    return response.data["hydra:member"];
  } else {
    return []; // Retourne un tableau vide si la réponse est indéfinie ou incorrecte
  }
};
