import { isValidElement } from "react";
import {IGameInfoType, IUserDataType} from "./types";
import {isValid, isBefore, isAfter, endOfDay} from "date-fns";
import Countdown from 'react-countdown';

export const checkUserHasSingedIn = (userData:IUserDataType) => {
    return !!userData && userData.address !=="";
}

export const ensureIsDate = (value: any)=>{
    if(value instanceof Date && isValid(value)){
        return value;
    }

    if(typeof value === "number") {
        return new Date(value);
    }

    if(typeof value === "string") {
        // const Iso8601 = /^(?<year>\d{4})-(?<month>\d{2})-(?<date>\d{2})$/;
        // const isPartialIso8601 = Iso8601.test(value);
        // if (isPartialIso8601){
        //     const [year, month, date] = value.split("-");
        //     const rfcFormat = `${month}/${date}/${year}`
        //     return new Date(rfcFormat);
        // }
        // add more date format if needed
        return new Date(value);
    }

    throw new Error ("Invalild Date received: " + value);
}

export const countDownTimer = (game: IGameInfoType) => {
    if(isAfter(Date.now(), ensureIsDate(game.gameWindowStarTime))){
      return (
        <>
          Participation Countdown: { !!game.gameWindowStarTime &&
            <Countdown date={new Date("2021-04-01 00:00:00")} />
          }
        </>
      )
    }else{
      return (
        <>
          Answer Reveal Countdown: { !!game.gameWindowEndTime &&
            <Countdown date={new Date("2021-04-01 00:00:00")} />
          }
        </>
      )
    }
  }

  export const priceFormatter = (price: number) => {
    return (price).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  }

  export const numberWithCommas = (value: number) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}