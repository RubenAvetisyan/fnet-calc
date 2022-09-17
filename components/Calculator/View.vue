<script setup lang="ts">
import { format, getDate, getDaysInMonth } from 'date-fns'

const props = defineProps({
  price: { type: Number, required: true },
  percent: { type: Number, required: true },
  billdays: { type: Array<number>, default: [11, 16, 21], required: true }
})

const pResult = computed(() => {
  const price: number = unref(props.price)
  const percent: number = unref(props.percent)

  return price - (price * percent / 100)
})

const today = ref(new Date())
const datesStringToNumber = (d: string[]) => d.map((date: string) => getDate(new Date(date)))
const dates = ref([format(today.value, 'yyyy-MM-dd')])
const startdays = computed(() => {
  return datesStringToNumber(unref(dates))
})

const sd = props.billdays.filter((d: number) => startdays.value.some((date: number) => d > date)).sort((a: number, b: number) => b - a)[0]
const endDay = ref(sd)

const daysDiff = computed(() => {
  const diff = unref(startdays).map((sd: number) => unref(endDay) - sd)
  console.log('daysDiff: ', diff);
  return diff
})


const result = computed(() => {
  const priceAfterPerscent = unref(pResult)
  console.log('priceAfterPerscent: ', priceAfterPerscent);
  const datesOrigin = unref(dates)
  console.log('datesOrigin: ', datesOrigin);
  const endDate = unref(endDay)
  const difference = unref(daysDiff)
  console.log('difference: ', difference);
  console.log('endDate: ', endDate);
  const value = unref(startdays).map((startDate: number, i) => {
    console.log('startDate: ', startDate);
    const daysInMonth = getDaysInMonth(new Date(datesOrigin[i]))
    console.log('daysInMonth: ', daysInMonth);
    const calculatedPrice = Math.abs(difference[i]) * (priceAfterPerscent / daysInMonth) + priceAfterPerscent
    console.log('i: ', i);
    const result = difference[i] <= +10 ? priceAfterPerscent : calculatedPrice
    console.log('difference[i] <= 10 : ', difference[i] <= 10);
    const res = useRoundUp(result, 50)
    console.log('res: ', res);
    return res
  })

  console.log('value: ', value);
  return value
})
</script>

<template>
  <div class="wrapper bg-white rounded shadow w-screen">
    <div>{{price}} | {{percent}}% = {{pResult}}</div>

    <ion-item-group>
      <ion-item-divider>
        <ion-label>Պայմանագրի Պայմաններ.</ion-label>
      </ion-item-divider>
      <ion-grid class="px-10">
        <ion-row>
          <ion-col>
            <mobi-select v-model="endDay" :values="billdays" label="endDay"></mobi-select>
          </ion-col>
          <ion-col>
            <my-button id="open-modal">Հաշվարկի սկիզբ</my-button>
            <ion-modal trigger="open-modal">
              <CalculatorCalendar id="datetime" v-model="dates" />
            </ion-modal>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-item-group>
    {{result.join()}}
    <div v-for="(date, i) in dates" :key="date">result: {{result[i]}} for {{date}}</div>
  </div>
</template>
