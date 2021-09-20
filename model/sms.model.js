class Sms {

    constructor(message='',
                from='',
                route=1,
                idd='',
                smartCut=1,
                priority=0,
                toDate=''){
        this.message = message;
        this.from = from;
        this.route = route;
        this.idd = idd;
        this.smartCut = smartCut;
        this.priority = priority;
        this.toDate = toDate;
    }
}

module.exports = Sms;
