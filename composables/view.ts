import { Ref } from "vue"

type Prop<T> = T | Ref<T>
type Asdate = Prop<string | number | Date>


export const useIsDateEabled = (billdays: Prop<number[]>) => (dateString: Asdate) => {
  const setDateLeft = (billday: number): Date => useSetDate(dateString, billday)
  const isDate = unref(billdays).some(billday => useIsSameDay(setDateLeft(billday), dateString))
  
  return isDate
}

export const useSetNextEndDay = (date: Asdate, billdays: Prop<number[]>, type: 'add' | 'sub') => {
  const lastDate = useToDate(date)
  console.log('lastDate: ', lastDate, type);
  // const endDate = useToDate(end)
  const isDateEabled = useIsDateEabled(billdays)

  // const diff = useDifferenceInCalendarDay(endDate, startDate)
  // console.log('diff: ', diff);
  const exp = (s: Date) => { 
    if (type === 'add') return useAddDays(s, 1)
    if (type === 'sub') return useSubDays(s, 1)
    throw new Error('Es inch qaqes kerel? :)')
  }
  let nearestEndDay = exp(lastDate)

  for (let i = 0; i < 31; i++) {
    if (isDateEabled(nearestEndDay)) {
      break;
    }

    nearestEndDay = exp(nearestEndDay)
  }

  return nearestEndDay
}
