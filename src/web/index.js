class Index {
  constructor(str) {
    this.str = str
  }
  say () {
    console.log(this.str)
  }
}

const index = new Index('test222')
index.say()

export default Index