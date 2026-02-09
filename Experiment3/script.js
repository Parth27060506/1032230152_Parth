const form = document.getElementById('studentForm')

const fullName = document.getElementById('fullName')
const email = document.getElementById('email')
const phone = document.getElementById('phone')
const age = document.getElementById('age')
const course = document.getElementById('course')
const roll = document.getElementById('roll')

const nameErr = document.getElementById('nameErr')
const emailErr = document.getElementById('emailErr')
const phoneErr = document.getElementById('phoneErr')
const ageErr = document.getElementById('ageErr')
const courseErr = document.getElementById('courseErr')
const rollErr = document.getElementById('rollErr')

const doneMsg = document.getElementById('doneMsg')

function tidy() {
  doneMsg.className = 'msg'
  doneMsg.textContent = ''
}

function putErr(box, where, msg) {
  where.textContent = msg
  box.classList.add('bad')
  box.classList.remove('ok')
}

function clearErr(box, where) {
  where.textContent = ''
  box.classList.remove('bad')
  box.classList.add('ok')
}

function isEmailOk(s) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s)
}

function digitsOnly(s) {
  return s.replace(/\D/g, '')
}

function checkAll() {
  let ok = true

  const nm = fullName.value.trim()
  if (nm.length < 3) {
    putErr(fullName, nameErr, 'Enter at least 3 characters.')
    ok = false
  } else {
    clearErr(fullName, nameErr)
  }

  const em = email.value.trim()
  if (!isEmailOk(em)) {
    putErr(email, emailErr, 'Enter a valid email.')
    ok = false
  } else {
    clearErr(email, emailErr)
  }

  const ph = digitsOnly(phone.value)
  if (ph.length !== 10) {
    putErr(phone, phoneErr, 'Enter a 10-digit phone number.')
    ok = false
  } else {
    phone.value = ph
    clearErr(phone, phoneErr)
  }

  const a = Number(age.value)
  if (!Number.isFinite(a) || a < 16 || a > 60) {
    putErr(age, ageErr, 'Age must be between 16 and 60.')
    ok = false
  } else {
    clearErr(age, ageErr)
  }

  const c = course.value
  if (!c) {
    putErr(course, courseErr, 'Select a course.')
    ok = false
  } else {
    clearErr(course, courseErr)
  }

  const r = roll.value.trim()
  if (r.length < 5) {
    putErr(roll, rollErr, 'Enter a valid roll number.')
    ok = false
  } else {
    clearErr(roll, rollErr)
  }

  return ok
}

form.addEventListener('submit', (e) => {
  tidy()
  const ok = checkAll()
  if (!ok) {
    e.preventDefault()
    return
  }

  e.preventDefault()
  doneMsg.className = 'msg show good'
  doneMsg.textContent = 'Submitted successfully.'
})

form.addEventListener('reset', () => {
  ;[fullName, email, phone, age, course, roll].forEach((x) => {
    x.classList.remove('bad')
    x.classList.remove('ok')
  })
  ;[nameErr, emailErr, phoneErr, ageErr, courseErr, rollErr].forEach((x) => (x.textContent = ''))
  tidy()
})
