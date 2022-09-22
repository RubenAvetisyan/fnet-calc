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
  const natural = type === 'sub' ? unref(billdays) : billdays
  const isDateEabled = useIsDateEabled(natural) 
  
  let nearestEndDay = exp(lastDate, type)

  for (let i = 0; i < 31; i++) {
    if (isDateEabled(nearestEndDay)) {
      break;
    }

    nearestEndDay = exp(nearestEndDay, type)
  }

  return nearestEndDay
}

function exp(date: Date, type: 'add' | 'sub') { 
  try {
    if (type === 'add') return useAddDays(date, 1)
    if (type === 'sub') return useSubDays(date, 1)

    throw createError({ message: 'Es inch qaqes kerel Doooo ara? :)', fatal: true})
  } catch (error: any) {
    showError(error);
    return date
  }
}
