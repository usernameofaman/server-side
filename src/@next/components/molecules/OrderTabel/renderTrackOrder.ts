import moment from 'moment';

export const showTrackLink=(placedOn: any)=>{
    let showLink=false;
    let configDays=45;
    if(placedOn){
        let placedDate=moment(placedOn,'DD-MM-YYYY');
        let todaysDate=moment();
        let differenceDays=todaysDate.diff(placedDate, 'days');

        if(differenceDays && differenceDays<=configDays)
        {
            showLink=true;
        }
    }
    return showLink;
}