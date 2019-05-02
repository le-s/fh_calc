import React from 'react';

import ScoreDropdown from './score_dropdown';
import Result from './result';

import "react-datepicker/dist/react-datepicker.css";

class Calc extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.onUpdateScore = this.onUpdateScore.bind(this);
    this.handleAnnualSlider = this.handleAnnualSlider.bind(this);
    this.handleAnnualText = this.handleAnnualText.bind(this);
    this.handleDownSlider = this.handleDownSlider.bind(this);
    this.handleDownText = this.handleDownText.bind(this);
    this.numberWithCommas = this.numberWithCommas.bind(this);
    this.state = {
      pageType: 'calc',
      formData: {
        maritalStatus: 'single',
        annualIncome: '0',
        downPayment: '0',
        monthlyDebt: '0',
        score: '0',
        insurance: '0',
        fees: '0',
        inflation: '2',
        savings: '4'
      },
    };
  }

  onUpdateScore(e) {
    this.setState({
      formData: {
        score: e.target.value
      }
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ 
      pageType: 'result',
      formData: {
        maritalStatus: document.querySelector('input[name="marital-status"]:checked').value,
        annualIncome: document.getElementById("annualR").value,
        downPayment: document.getElementById("downR").value,
        monthlyDebt: document.getElementById("monthlyDebt").value,
        score: document.getElementById("creditScore").value,
        insurance: document.getElementById("insurance").value,
        fees: document.getElementById("fees").value,
        inflation: document.getElementById("inflation").value,
        savings: document.getElementById("savings").value,
      }
    })
  }

  handleReset(e) {
    e.preventDefault();
    this.setState({
      pageType: 'calc',
      formData: {

      }
    })
  }

  numberWithCommas(x) {
    let parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }

  handleAnnualSlider() {
    document.getElementById("annualRange").value = this.numberWithCommas(document.getElementById("annualR").value);
  }

  handleAnnualText() {
    document.getElementById("annualR").value = document.getElementById("annualRange").value.toLocaleString();
  }

  handleDownSlider() {
    document.getElementById("downRange").value = this.numberWithCommas(document.getElementById("downR").value);
  }

  handleDownText() {
    document.getElementById("downR").value = document.getElementById("downRange").value;
  }

  render() {
    let displayPage;
    if (this.state.pageType === 'calc') {
      displayPage = <div className="header-calc-wrapper">
        <div className="header-title">
          <h1>What kind of home can I buy?</h1>
        </div>
        <div className="nav-calc">
          <form onSubmit={this.handleSubmit} className="form-wrapper">
            <div className="calc-wrapper">
                <div className="section-sizing">
                  <div className="header">
                    <span>Details</span>
                  </div>
                  <div className="section-inside">
                    <div className="spacing">
                      <label htmlFor="location">Location</label>
                      <input id="location" type="text" placeholder="City, State" autoFocus/>
                    </div>
                    <div className="spacing">
                      <p>Marital Status</p>
                      <div className="marital-radio-spacing" id="marital">
                        <input type="radio" name="marital-status" value="single" id="single" defaultChecked /> 
                        <label htmlFor="single">Single</label>
                        <input type="radio" name="marital-status" value="married" id="married"/> 
                        <label htmlFor="married">Married</label>
                      </div>
                    </div>
                    <div className="spacing">
                      <label htmlFor="annual-income">Annual Income</label>
                      <div className="slider-wrapper" id="annual-income">
                        <span className="dollar"><input type="text" id="annualRange" onInput={this.handleAnnualText} min="0" max="1000000" placeholder="0"/></span>
                        <input type="range" min="0" max="1000000" step="1000" defaultValue="0" onInput={this.handleAnnualSlider} id="annualR"/>
                      </div>
                    </div>
                    <div className="spacing">
                      <label htmlFor="down-payment">Down Payment</label>
                      <div className="slider-wrapper" id="down-payment">
                        <span className="dollar"><input type="text" id="downRange" onInput={this.handleDownText} min="0" max="10000000" placeholder="0"/></span>
                        <input type="range" min="0" max="10000000" step="5000" defaultValue="0" onInput={this.handleDownSlider} id="downR"/>
                      </div>
                    </div>
                    <div className="spacing">
                      <label htmlFor="monthlyDebt">Monthly Debt</label>
                      <span className="dollar"><input type="text" placeholder="0" id="monthlyDebt"/></span>
                    </div>
                    <div className="spacing">
                      <label htmlFor="creditScore">Credit Score</label>
                      <ScoreDropdown currentScore={this.state.formData.score} onUpdateScore={this.onUpdateScore} />
                    </div>
                  </div>
                </div>
                <div className="section-sizing">
                  <div className="header">
                    <span>Advanced</span>
                  </div>
                  <div className="section-inside">
                    <div className="spacing">
                      <label htmlFor="insurance">Annual Homeowner's Insurance</label>
                    <span className="percentage"><input type="text" placeholder="0" id="insurance"/></span>
                    </div>
                    <div className="spacing">
                      <label htmlFor="fees">Monthly HOA / Condo Fees</label>
                      <span className="dollar"><input type="text" placeholder="0" id="fees"/></span>
                    </div>
                    <div className="spacing">
                      <label htmlFor="inflation">Annual General Inflation</label>
                      <span className="percentage"><input type="text" defaultValue="2" id="inflation"/></span>
                    </div>
                    <div className="spacing">
                      <label htmlFor="savings">Annual Rate of Return on Savings</label>
                      <span className="percentage"><input type="text" defaultValue="4" id="savings"/></span>
                    </div>
                  </div>
                </div>
            </div>
            <div className="format-button">
              <input className="button-blue" type="submit" value="Calculate" />
            </div>
          </form>
        </div>
      </div>
    } else if (this.state.pageType === 'result'){
      displayPage = <Result formData={this.state.formData} commas={this.numberWithCommas} reset={this.handleReset}/>
    }
    return (
      <div>
        {displayPage}
      </div>
    );
  }
}

export default Calc;