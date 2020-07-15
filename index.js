
function MaskCell (props){
  return (
    <span className="mask_letter text-uppercase p-3 m-1 "> {props.letter} </span>
  )
}


function MaskComponent (props){
  return (
    <div className="mt-5" id="mask">
      
      <div className="d-flex justify-content-center align-align-items-center flex-wrap">

        { props.word.split('').map((letter, index)=> <MaskCell letter={props.mask.includes(letter) ? letter: "_"} key={index} />) }
      </div>

      <div className=" text-center mt-3"> 
        <small className="text-muted"> a word of {props.word.length} letters</small>
      </div>
     
      <div className=" text-center mt-3"> 
        <small className="text-danger"> {props.essais} essais left</small>
      </div>
    </div>
  )
}

function Letter(props){
  return (
    <button className={`col-1 p-3 m-1 bg-light text-center ${props.status}`} disabled= {props.status != ""} onClick={()=>props.click(props.letter)}> {props.letter} </button>
  )
}


function PlayButton(props){
  return (
    <div className="text-center mt-4">
      <button className="btn btn-lg btn-outline-success" onClick= {()=>props.click() }> play a game </button>
    </div>
  )
}

function LostMessage (props){
  return (
    <div>
      <h2 className="text-center mt-4 text-danger"> you have lost :( 
        <br/>
        the word is {props.word}
      </h2>
      <PlayButton click={props.click} />
    </div>
  )
}

function WinMessage (props){
  return (
    <div>
      <h2 className="text-center mt-4 text-success"> congrats you have won in {props.essais} essais  
      </h2>
      <PlayButton click={props.click} />
    </div>
  )
}

class App extends React.Component{


  constructor(props){
    super();
    
    this.letters = []
    for (let i=65; i<91; i++){
      this.letters.push(String.fromCharCode(i))
    }

    this.state = {
      isPlaying : false,
      current_word : "",
      mask: [],
      clicked_letters: [],
      essais : null
    }
  }

  componentWillMount(){
    this.words = [ "hello", "world" ,"forbid", "sphere", "leader", "limited", "pleasant", "prescription", "battlefield", "expect"  ,"motivation" ,
    "temperature", "food",  "document" ,"whisper", "economics", "unanimous"];
    this.words = this.words.map((word)=> word.toUpperCase());
  }

  handlePlayClick = () => {
    let {isPlaying, current_word, essais} = this.state ;
    let word = this.words[Math.floor(Math.random() * this.words.length)];
    this.setState({isPlaying: true, current_word: word, essais: word.length, mask:[], clicked_letters: []})

  }


  handleButtonClick = (letter) => {
    let {current_word, mask, clicked_letters, essais} = this.state;
    if (current_word.includes(letter)){
      mask.push(letter)
      this.setState({mask: mask})
    }
    else {
      clicked_letters.push(letter)
      this.setState({clicked_letters: clicked_letters, essais: essais-1})
    }
  }


  get_status = function(letter){
    let {mask, clicked_letters} = this.state;

    if (mask.includes(letter)){
      console.log(letter)
      return "text-success"
    }

    if (clicked_letters.includes(letter)){
      return "text-danger"
    }

    return ""  
  }

  getLetters = function(){
    return (
      <div id="letters" className="mt-4">
      <h6> click to select letters :</h6>
      <hr/>
      <div className="row">
        { this.letters.map( (letter) => (<Letter letter={letter} key={letter} status={this.get_status(letter)}  click={this.handleButtonClick} />))  }
      </div>
    </div>
    
    )
  }

  

  render(){

    let lose = this.state.essais === 0
    let win = this.state.current_word.split("").every((letter)=>this.state.mask.includes(letter))  
    let main_component;

    if (!this.state.isPlaying )
      return (
        <PlayButton click={this.handlePlayClick} />
      )
    

    if (lose)
      main_component = (
          <LostMessage word={this.state.current_word} click = {this.handlePlayClick}/>
        )
    

    else if (win)
      main_component = (
        <WinMessage essais={this.state.current_word.length - this.state.essais} click={this.handlePlayClick}/>
      )
    

    else 
      main_component = this.getLetters()
    

    return (
      <div>
        <MaskComponent word={this.state.current_word} essais={this.state.essais} mask={this.state.mask}/>
        {main_component}        
      </div>
    )
  }

}



ReactDOM.render(
  <App/>,
  document.getElementById("root")
)