import moment from 'moment';

export function formatDate(value) {
    return moment(value, moment.ISO_8601).format('DD/MM/YYYY HH:mm:ss');
}
