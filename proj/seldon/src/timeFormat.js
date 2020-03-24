export default function timeFormat() {
  return `${(new Date().getHours() < 10 ? '0' : '') +
    new Date().getHours()}:${(new Date().getMinutes() < 10 ? '0' : '') +
    new Date().getMinutes()}:${(new Date().getSeconds() < 10 ? '0' : '') +
    new Date().getSeconds()}`
}
