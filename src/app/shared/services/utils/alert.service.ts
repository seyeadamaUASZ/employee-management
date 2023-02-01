import { Injectable } from '@angular/core';
import swal, { SweetAlertOptions } from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { Alert } from '../../models/utils/alert.model';

@Injectable({
    providedIn: 'root'
})
export class AlertService {
    constructor(private toastr: ToastrService) {}

    showAlert(alert: Alert): void {
        this.toastr.clear();

        switch (alert.status) {
            case 'OK':
                this.toastr.success(alert.message, alert.titre);
                break;
            case 'EXCEPTION':
                this.toastr.error(alert.message, alert.titre);
                break;
            case 'INFO':
                this.toastr.info(alert.message, alert.titre);
                break;
            case 'WARNING':
                this.toastr.warning(alert.message, alert.titre);
                break;
            default:
                this.toastr.error(alert.message, alert.titre);
                break;
        }
    }

    showSwal(type: string, callbacks: any, titre?: string, message?: string, checkReason?: boolean): void {
        const options: SweetAlertOptions = {
            title: 'Êtes-vous sûr de faire cette action ?',
            text: 'Vous ne pourrez pas revenir en arrière !',
            icon: 'question',
            showCancelButton: true,
            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonColor: '#65B8DD',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui, je confirme!',
            cancelButtonText: 'Annuler'
        };

        if (checkReason) {
            options.input = 'textarea';
        }

        switch (type) {
            case 'OK':
                swal.fire({
                    title: titre,
                    text: message,
                    icon: 'success',
                    confirmButtonColor: '#65B8DD'
                });

                break;
            case 'KO':
                swal.fire({
                    title: titre,
                    text: message,
                    icon: 'error',
                    confirmButtonColor: '#65B8DD'
                });

                break;
            case 'CONFIRM':
                swal.fire(options).then((result: any) => {
                    if (result.isConfirmed) {
                        callbacks(result);
                    }
                });
                break;
        }
    }

    showMessage(statusCode: number): string {
        let message = '';
        switch (statusCode) {
            case 888:
                message = "Une erreur inconnue s'est produite. \nVeuillez réessayer plus tard.";
                break;
            case 401:
                message = "Vous n'avez pas les droits nécessaires pour faire cette action.";
                break;
            case 200:
                message = 'Votre opération a été effectuée avec succès.';
                break;
            case 550:
                message = 'Le statut actuel de la demande ne vous permet pas de faire cette action.';
                break;
            case 551:
                message = 'La demande KYC est déja traitée.';
                break;
            case 552:
                message = "Vous avez atteint le nombre maximum de modification autorisé. \n Merci de contacter l'administrateur.";
                break;
            case 553:
                message = 'V';
                break;
            case 554:
                message = 'La demande KYC est entrain dêtre modifié par le client. \n Merci de patienter.';
                break;
            case 555:
                message = "L'action effectuée n'est pas autorisé.";
                break;
            case 556:
                message = 'Le format fourni est incorrect.';
                break;
            case 600:
                message = "L'email fourni ou le ninéa est déjà utilisé dans une demande KYC en cours.";
                break;
            case 601:
                message = "L'email fourni est déjà utilisé dans une demande KYC en cours.";
                break;
            case 625:
                message = 'Impossible de trouver la ressource demandée.';
                break;
            case 650:
                message = 'Merci de fournir toutes les informations obligatoires.';
                break;
            case 651:
                message = 'Le capital social est obligatoire.';
                break;
            case 652:
                message = 'Les pièces jointes sont obligatoires.';
                break;
            case 700:
                message = "Une erreur inconnue s'est produite. \nVeuillez réessayer plus tard.";
                break;
            case 750:
                message = 'Les données que vous avez fourni sont inccorrectes.';
                break;
            case 800:
                message = 'Les données que vous avez fourni sont inccorrectes.';
                break;
            default:
                message = "Une erreur inconnue s'est produite. \nVeuillez réessayer plus tard ou contacter l'administrateur.";
                break;
        }

        return message;
    }
}
