import { fetch, FetchResponse } from "../utils/dataAccess";
import { User } from "../types/User";

export const getAllUsers = async (): Promise<User[]> => {
  const response: FetchResponse<{ "hydra:member": User[] }> | undefined = await fetch<{ "hydra:member": User[] }>("/users");

  if (response && response.data && "hydra:member" in response.data) {
    return response.data["hydra:member"];
  } else {
    return []; // Retourne un tableau vide si la réponse est indéfinie ou incorrecte
  }
};
