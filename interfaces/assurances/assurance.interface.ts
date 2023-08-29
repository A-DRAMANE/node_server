export interface BaseAssurance {
    DATE_EFFET: string;
    DATE_ECHEANCE: string;
    DESTINATION: string;
    VILLE: string;
    ETAT_ALERT: string;
    ETAT_CONF: string;
    OBSERVATION: string;
    MONTANT: number;
    ETAT_ASSU: string;
    ID_USER: string;
    NUM_VEHI: string;
    NUM_MARCHE: string;
    MATRI_EMP: string;
    MATRI_FSSEUR: number;
    NUM_TYPE: number;
    DATE_INSERT: string;
    IS_ACTIVE: string;
    UPDATE_USER: string;
    UPDATE_DATE: string;
    RUPTURE_USER: string;
    RUPTURE_DATE: string;
    USER_VALIDATE: string;
    VALIDATE_DATE: string;
}

export interface Assurance extends BaseAssurance {
    NUM_POLICE_ASSURANCE: string;
}