
import React from 'react';
import { render } from 'react-dom';
import styles from './Calendar.css';


//calendar component
class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            day: new Date().getDate(),
            month: new Date().getMonth(),
            year: new Date().getFullYear(),
            monday:'',
            tuesday:'',
            wednesday:'',
            thursday:'',
            friday:'',
            suturday:'',
            sanday:''
        };

        this.nextMonth = this.nextMonth.bind(this);
        this.previousMonth = this.previousMonth.bind(this);
    }

     //#let 's shift dates to their position column(mo,tu..., 2->Tue) ..)
     addEmptyFields(sortedDays) {
         let keys = Object.keys(sortedDays);
        
         let stopAddingEmptyField = false;
      
        keys.forEach((el,index)=>{
           // let previousIndex = keys.indexOf(week);
           // let nextIndex = keys.indexOf(week)+1;
            //let nextItem = keys[nextIndex];
           
           //error
            //let previousItem = keys[previousIndex];
           // console.log('l.. '+sortedDays[keys[j]].length);
          console.log(index);
            if(sortedDays[keys[index]][0]!=1 && stopAddingEmptyField ==false && sortedDays[keys[index]].length!=6 ){
                sortedDays[keys[index]].unshift('');
            }else if(sortedDays[keys[index]][0]==1){stopAddingEmptyField =true;}
            
        });
        return sortedDays;
    };
  
    //#let's check if arg exactly a number of month 
    checkMonth(arg) {
        if (isNaN(arg)) {
            throw new Error('Incorrect input argument. Its should be number type of argument!');
        } else { return arg; }
    };



    componentDidMount() {
        this.init();
    }

     // # get month name like July 
     getMonthNameBy(number) {
        let n = this.checkMonth(number);
        const Months = [' Junuary', ' February ', ' March ', ' April ', ' May ', ' Jun ',
            ' July ', ' August ', ' September ', ' October ', ' November ', ' December '
        ];
        return Months[n];
    };
    
    //# how many days of the month 
    getDaysInMonth(month) {
        return 32 - new Date(this.state.year, month, 32).getDate();
    };

      
    //get a week name like Friday 
    getDayOfWeek(day) {
        if (day > 6 || day <
            0) throw new Error('Incorrect number of week. Please check it');
        const week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return week[day];
    };

    outputDates(nameOfWeek,daysOfMonth){
        let structure=[];
       for(let props in daysOfMonth ) {
            if(props==nameOfWeek){
                for (let i = 0; i < daysOfMonth[props].length; i++) {
                    if(daysOfMonth[props][i]==""){
                        structure.push(<div className={styles.dateElement}>&#160;</div>);    
                    }else{
                        structure.push(<div className = {daysOfMonth[props][i]==new Date().getDate()?styles.currentDate:styles.dateElement}>{daysOfMonth[props][i]}</div>); 
                    }
                }
            }
       
        }
        return structure;
    }
    

    //entry point
    init() {
        let sortedDays = this.sortDates(this.state.month, this.state.year);
        let sortedDaysWithEmptyFields = this.addEmptyFields(sortedDays);
        this.setState({
            monday:this.outputDates("mo",sortedDaysWithEmptyFields),
            tuesday:this.outputDates("tu",sortedDaysWithEmptyFields),
            wednesday:this.outputDates("we",sortedDaysWithEmptyFields),
            thursday:this.outputDates("th",sortedDaysWithEmptyFields),
            friday:this.outputDates("fr",sortedDaysWithEmptyFields),
            suturday:this.outputDates("su",sortedDaysWithEmptyFields),
            sanday:this.outputDates("sa",sortedDaysWithEmptyFields)
        });
    };

    // increment for month button next
    nextMonth() {
        this.setState({
            month:++this.state.month,
            month:this.state.month>11?(this.state.month%11)-1:this.state.month,
            year:this.state.month>11?++this.state.year:this.state.year
        },()=>{
            this.init();
        });   
    };

    // decrement for month button previous 
    previousMonth() {
        this.setState({
            month:--this.state.month,
            month:this.state.month<0?11:this.state.month,
            year:this.state.month<0?--this.state.year:this.state.year
        },()=>{
            this.init();
        });   
    };

    //sort dates by weekNames
    sortDates(m, year) {
        let month = this.checkMonth(m);
        const daysInMonth = this.getDaysInMonth(month);
        let sortedDatesByWeekName = {mo:[],tu:[],we:[],th:[],fr:[],su:[],sa:[]};
        for (let j = 1; j <= daysInMonth; j++) {
            let numberOfWeek = new Date(year,month,j);
            let weekName = numberOfWeek.getDay();
            switch (weekName) {
                case 0:
                    sortedDatesByWeekName.sa.push(j);
                    break
                case 1:
                    sortedDatesByWeekName.mo.push(j);
                    break;
                case 2:
                    sortedDatesByWeekName.tu.push(j);
                    break;
                case 3:
                    sortedDatesByWeekName.we.push(j);
                    break;
                case 4:
                    sortedDatesByWeekName.th.push(j);
                    break;
                case 5:
                    sortedDatesByWeekName.fr.push(j);
                    break;
                case 6:
                    sortedDatesByWeekName.su.push(j);
                    break;
            }
        }
        return sortedDatesByWeekName;
    };

    //DOM
    render() {
      return (
        <div className="calendarContentWrapper">
            <div className = {styles.calendarContainer}>
              <div className = {styles.header}>
                <div className = {(styles.currentMonth)}>
                      {this.getMonthNameBy(this.state.month)}
                </div>
                <div className={(styles.currentYear)}>
                    {this.state.year}
                </div>
                <div className = {styles.controlButton }>
                    <button className={styles.button} onClick={this.previousMonth}> &#x226A; </button>
                    <button className = {styles.button} onClick = {this.nextMonth} >&#x226B;</button> 
                </div> 
            </div>
            <div className = "calendarContent">
                <div className={styles.weekContainer}>
                    <div className={styles.captionWeekName}>Mn</div>
                    <div className={styles.captionWeekName}>Tu</div>
                    <div className={styles.captionWeekName}>We</div>
                    <div className={styles.captionWeekName}>Th</div>
                    <div className={styles.captionWeekName}>Fr</div>
                    <div className={styles.captionWeekName}>Su</div>
                    <div className={styles.captionWeekName}>Sa</div>
                </div>
                <div className={styles.datesContainer}>
                    <div>{this.state.monday}</div>
                    <div>{this.state.tuesday}</div>
                    <div>{this.state.wednesday}</div>
                    <div>{this.state.thursday}</div>
                    <div>{this.state.friday}</div>
                    <div>{this.state.suturday}</div>
                    <div>{this.state.sanday}</div>
                </div>
            </div>  
        </div> 
      </div> 
        );
  };


};

export default Calendar;