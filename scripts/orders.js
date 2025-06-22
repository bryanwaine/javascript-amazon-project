const callback = (entries, observer) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      entry.target.classList.add('slide-up')
      observer.unobserve(entry.target)
    } 
  })
}

const options = {
  threshold: 0.2
}

const observer = new IntersectionObserver(callback, options)

const animatedElements = document.querySelectorAll('.content')
animatedElements.forEach(el => observer.observe(el))
