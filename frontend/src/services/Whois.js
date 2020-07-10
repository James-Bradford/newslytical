import Api from "./Api";

/**
 * Contains the required methods to access information about a domain
 */
export class Whois {

    lookup(url) {
        return Api.get(`/domain/google.com`);
    }
}