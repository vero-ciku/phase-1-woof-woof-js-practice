document.addEventListener("DOMContentLoaded",
  grabPuppies()
)

function grabPuppies() {
  fetch("http://localhost:3000/pups")
  .then(resp => resp.json())
  .then(puppyData => puppyData.forEach(puppy => allPuppies(puppy)))

}

function allPuppies(puppy) {
  const newPuppy = document.createElement("span")
  newPuppy.innerText = `${puppy.name}`
  document.querySelector("#dog-bar").appendChild(newPuppy)

  const img = document.createElement("img")
  img.setAttribute("src", `${puppy.image}`)

  const h2 = document.createElement("h2")
  h2.innerText = `${puppy.name}`

  const btn = document.createElement("button")
  if (puppy.isGoodDog === true) {
    btn.innerText = "Good Dog!"
  } else {
    btn.innerText = "Bad Dog!"
  }

  newPuppy.addEventListener("click", () => {
    const dogInfo = document.querySelector("#dog-info")
    dogInfo.append(img, h2, btn)
  })

  btn.addEventListener("click", () => {
    if(btn.innerText === 'Good Dog!') {
      btn.innerText = "Bad Dog!",
      puppy.isGoodDog = false
    } else {
      btn.innerText = "Good Dog!",
      puppy.isGoodDog = true
    }
    changeImg(puppy)
  })
} 

function changeImg(puppy) {
  fetch(`http://localhost:3000/pups/${puppy.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type" : "application/json",
      Accept : "application/json"
    },
    body : JSON.stringify({
      name: puppy.name,
      isGoodDog: puppy.isGoodDog,
      image: puppy.image
    })
  })
  .then(resp => resp.json())
  .then(data => console.log(data))
}