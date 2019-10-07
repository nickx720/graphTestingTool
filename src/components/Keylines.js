import React from 'react';
import 'keylines';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Chart } from './react-keylines';
import * as KeylinesService from '../services/Keylines';
import { CounterContext } from './JSONContext';


/* const useStyles = makeStyles(theme => ({
    
  })); */

let data =
{
    type: 'LinkChart',
    items: [
        { type: 'node', id: 'ac1', u: 'icons/bank.png', t: '45081063' },
        { type: 'node', id: 'ac2', u: 'icons/bank.png', t: '91422615' },
        { type: 'node', id: 'ac3', u: 'icons/bank.png', t: '59798694' },
        { type: 'node', id: 'ac4', u: 'icons/bank.png', t: '71012007' },
        { type: 'node', id: 'ac5', u: 'icons/bank.png', t: '29692722' },
        { type: 'node', id: 'ad1', u: 'icons/address.png', t: '2480 Richards Ave' },
        { type: 'node', id: 'ad2', u: 'icons/address.png', t: '3731 Farland St' },
        { type: 'node', id: 'ad3', u: 'icons/address.png', t: '3343 Beechwood Ave' },
        { type: 'node', id: 'p1', u: 'icons/man.png', t: 'James HALL' },
        { type: 'node', id: 'p2', u: 'icons/woman.png', t: 'Michelle TURNER' },
        { type: 'node', id: 'p3', u: 'icons/man.png', t: 'Ryan TURNER' },
        { type: 'node', id: 'p4', u: 'icons/woman.png', t: 'Jennifer CARTER' },
        { type: 'node', id: 'p5', u: 'icons/woman.png', t: 'Isabella PEREZ' },
        { type: 'node', id: 'p6', u: 'icons/woman.png', t: 'Brittany CAMPBELL' },
        { type: 'link', id: 'l1', id1: 'ac1', id2: 'ac3', a1: true, c: '#79a331', w: 15 },
        { type: 'link', id: 'l2', id1: 'ac1', id2: 'ac3', a2: true, c: '#79a331', w: 3 },
        { type: 'link', id: 'l3', id1: 'ac2', id2: 'ac1', a1: true, c: '#79a331', w: 8 },
        { type: 'link', id: 'l4', id1: 'ac2', id2: 'ac4', a2: true, c: '#79a331', w: 12 },
        { type: 'link', id: 'l5', id1: 'ac2', id2: 'ac5', a2: true, c: '#79a331', w: 10 },
        { type: 'link', id: 'l6', id1: 'ac3', id2: 'ac2', a2: true, c: '#79a331', w: 7 },
        { type: 'link', id: 'l7', id1: 'p1', id2: 'ac1', c: '#ff7f7f', w: 5 },
        { type: 'link', id: 'l8', id1: 'p1', id2: 'ad2', c: '#ff7f7f', w: 5 },
        { type: 'link', id: 'l9', id1: 'p2', id2: 'ad1', c: '#ff7f7f', w: 5 },
        { type: 'link', id: 'l10', id1: 'p2', id2: 'ac3', c: '#ff7f7f', w: 5 },
        { type: 'link', id: 'l11', id1: 'p3', id2: 'ac3', c: '#ff7f7f', w: 5 },
        { type: 'link', id: 'l12', id1: 'p3', id2: 'ad1', c: '#ff7f7f', w: 5 },
        { type: 'link', id: 'l13', id1: 'p4', id2: 'ad2', c: '#ff7f7f', w: 5 },
        { type: 'link', id: 'l14', id1: 'p4', id2: 'ac4', c: '#ff7f7f', w: 5 },
        { type: 'link', id: 'l15', id1: 'p5', id2: 'ad3', c: '#ff7f7f', w: 5 },
        { type: 'link', id: 'l16', id1: 'p5', id2: 'ac2', c: '#ff7f7f', w: 5 },
        { type: 'link', id: 'l17', id1: 'p6', id2: 'ad3', c: '#ff7f7f', w: 5 },
        { type: 'link', id: 'l18', id1: 'p6', id2: 'ac5', c: '#ff7f7f', w: 5 }
    ]
};

let keyLinesData = {};
let chartGlobal;
let loader;
let toggleDisplay;
const progress = {
    margin: '10em',
    marginLeft: '30em'
};
class Keylines extends React.Component {
    static contextType = CounterContext;
    constructor(props) {
        super(props)
        this.state = { loaded: true, visibility: 'hidden' }
        this.loader = true;
        this.loadedChart = this.loadedChart.bind(this);
        this.generateChart();
    }
    componentDidUpdate() {
        const state = this.context;
        console.log(state);
        console.log(state.state.json);
        this.generateChart(state.state.json);
    }
    generateChart = async (dataParsed) => {
        const defaultLoad =
        {
            "searchContext": {
                "aggRequired": "true",
                "pageNo": 0,
                "pageSize": 20,
                "searchCriteria": {
                    "service": [
                        "GF0001"
                    ]
                },
                "sortKey": "eventDateTime",
                "sortOrder": "desc"
            },
            "graphFilter": {
                "relationshipMetadata": [
                    {
                        "code": "HAS_CORRESPONDENCE_EMAIL",
                        "field": "emails",
                        "label": "Same email address",
                        "minCount": 1
                    },
                    {
                        "code": "HAS_CORRESPONDENCE_PHONE_NUMBER",
                        "field": "phoneNumbers",
                        "label": "Same Phone number",
                        "minCount": 1
                    },
                    {
                        "code": "FROM_LOCALITY",
                        "field": "localities",
                        "label": "Same Locality",
                        "minCount": 2
                    },
                    {
                        "code": "STAYED_IN_HOTEL",
                        "field": "hotelKey",
                        "label": "Same Hotel",
                        "minCount": 2
                    },
                    {
                        "code": "STAYED_IN_ROOM",
                        "field": "roomKey",
                        "label": "Same Hotel Room",
                        "minCount": 2
                    },
                    {
                        "code": "CHECKED_IN_WEEK",
                        "field": "checkinWeeklyTemporalWindow",
                        "label": "Same Week Hotel Checkin",
                        "minCount": 2
                    },
                    {
                        "code": "CHECKED_OUT_WEEK",
                        "field": "checkoutWeeklyTemporalWindow",
                        "label": "Same Week Hotel Checkout",
                        "minCount": 2
                    },
                    {
                        "code": "CHECKED_IN_MONTH",
                        "field": "checkInMonthlyTemporalWindow",
                        "label": "Same month hotel checkin ",
                        "minCount": 2
                    },
                    {
                        "code": "CHECKED_OUT_MONTH",
                        "field": "checkoutMonthlyTemporalWindow",
                        "label": "Same month hotel checkout",
                        "minCount": 2
                    },
                    {
                        "code": "WITH_HOTEL_BOOKING_REFERENCE",
                        "field": "bookingReferenceKey",
                        "label": "Same Hotel booking reference",
                        "minCount": 1
                    },
                    {
                        "code": "WITH_EXTERNAL_BOOKING_REFERENCE",
                        "field": "externalBookingReferenceKey",
                        "label": "Same Hotel External Booking Reference",
                        "minCount": 1
                    },
                    {
                        "code": "PAID_WITH_CARD",
                        "field": "paymentcardNo",
                        "label": "Same Payment Card",
                        "minCount": 1
                    },
                    {
                        "code": "ARRIVED_AT_PORT",
                        "field": "movementSegments.arrivalPort",
                        "label": "Same Arrival port",
                        "minCount": 10
                    },
                    {
                        "code": "DEPARTURE_AT_PORT",
                        "field": "movementSegments.departurePort",
                        "label": "Same Departure Port",
                        "minCount": 10
                    },
                    {
                        "code": "TRAVELLED_ON_FLIGHT",
                        "field": "movementSegments.serviceKey",
                        "label": "Same Flight",
                        "minCount": 4
                    },
                    {
                        "code": "DEPARTED_AT",
                        "field": "movementSegments.departureDateMillis",
                        "label": "Same Departure Date",
                        "minCount": 4
                    },
                    {
                        "code": "ARRIVED_AT",
                        "field": "movementSegments.arrivalDateTimeMillis",
                        "label": "Same Arrival Date",
                        "minCount": 4
                    },
                    {
                        "code": "PHOTO_CAPTURED_AT",
                        "field": "context",
                        "label": "Same location of photo capture",
                        "minCount": 1
                    },
                    {
                        "code": "FROM_LOCALITY",
                        "field": "location",
                        "label": "Same Locality",
                        "minCount": 1
                    },
                    {
                        "code": "PHOTO_CAPTURED_ON_DAY",
                        "field": "photoCapturedTimeDailyTemporalWindow",
                        "label": "Same day of Photo capture",
                        "minCount": 1
                    },
                    {
                        "code": "PHOTO_CAPTURED_ON_WEEK",
                        "field": "photoCapturedTimeWeeklyTemporalWindow",
                        "label": "Same week of Photo capture",
                        "minCount": 1
                    },
                    {
                        "code": "WITH_VISA",
                        "field": "visaNumber",
                        "label": "Same Visa Number",
                        "minCount": 1
                    },
                    {
                        "code": "SPONSORED_BY",
                        "field": "sponsorKey",
                        "label": "Same Visa Sponsor",
                        "minCount": 1
                    },
                    {
                        "code": "HAS_RESIDENCY_ID",
                        "field": "residencyId",
                        "label": "Same Residency Id",
                        "minCount": 2
                    }
                ],
                "hideDisjoint": false,
                "collapsedMode": false,
                "cypherTemplate": null
            }
        }
        let dataforService = dataParsed === undefined ? defaultLoad : dataParsed;
        console.log(dataforService);
        const dataFromApi = await KeylinesService.KeylinesSync(dataforService);
        let nodes = [];
        let link = [];
        console.log(dataFromApi);
        dataFromApi.nodes.forEach((element, index) => {
            nodes.push({
                type: 'node',
                id: index,
                u: 'icons/man.png',
                t: element.value
            })
        });
        dataFromApi.connections.forEach((element, index) => {
            link.push({
                type: 'link',
                id: 'l' + index,
                id1: element.sourceIdx,
                id2: element.targetIdx,
                c: '#79a331',
                w: element.score
            })
        });
        console.log(nodes, link)
        keyLinesData = {
            type: 'LinkChart',
            items: [...nodes, ...link]
        };
        data = keyLinesData;
        if (dataParsed !== undefined) {
            console.log(chartGlobal);
            this.chart = chartGlobal;
            this.chart.load(data);
            this.chart.bind('progress', (task, progress) => {
                console.log(progress)
                if (progress === 1) {
                   /*  this.setState({
                        loaded: false,
                        visibility: 'visible'
                    }) */
                    /* this.toggleDisplay = 'none'; */
                    console.log(this.toggleDisplay);
                } else {
                    /*  this.toggleDisplay = 'block'; */
                }

            });
            this.chart.layout('organic', { tightness: 3 });
        }
    }
    loadedChart(chart) {
        console.log('I am here');
        console.log(chart)
        this.chart = chart;
        this.chart.bind('progress', (task, progress) => {
            console.log(progress)
            if (progress === 1) {
               /*  this.setState({
                    loaded: false,
                }) */
                /* this.toggleDisplay = 'none'; */
                this.loader = false;
            } else {
                /*  this.toggleDisplay = 'block'; */
            }

        });
        chartGlobal = chart;
        this.chart.load(keyLinesData);
        this.chart.layout('organic', { tightness: 1 });
    }
    render() {
        return (
            <div>
               {/*   <div>{this.loader && <CircularProgress style={progress} />}</div> */}
                <div>
                    <Chart
                        data={data}
                        ready={this.loadedChart}
                        containerClassName="chart-container"
                    />
                </div>
            </div>
        )

    }
}

export default Keylines;