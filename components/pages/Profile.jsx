/* @flow */

'use strict';

var React = require('react/addons');
var _ = require('lodash');

module.exports = function (treeData) {

  var cognitoAuth = require('../../lib/cognito')();
  var userHandler = require('../../lib/user')(treeData);
  
  return React.createClass({
    displayName: 'Profile',

    mixins: [treeData.mixin, React.addons.LinkedStateMixin],
    
    cursors: {
      user: ['user'],
      profile: ['profile'],
    },

    contextTypes: {
      router: React.PropTypes.func.isRequired
    },


    getInitialState: function getInitialState() : Object {
      return {
        nome: '',
        cognome: '',
        email: '',
        telefono: ''
      };
    },

    
    componentWillMount: function() : void {
      if (!this.cursors.user.get().authed) {
        this.context.router.transitionTo('home');
      }
    },


    componentDidMount: function() : void {
      
      var componentScope = this;

      if (!_.isEmpty(componentScope.cursors.profile.get())) {
        componentScope.loadProfile();
      } else {
        this.cursors.profile.on('update', function () { componentScope.loadProfile(); });
      }
    },


    loadProfile: function loadProfile() {
      
      var profile = this.cursors.profile.get();
      this.setState(profile);

      var editable = (this.state.email === '' || this.state.telefono === '');
      
      _.each(this.refs, function(item) {
        if (editable) {
          React.findDOMNode(item).setAttribute('readonly', true);
        } else {
          React.findDOMNode(item).removeAttribute('readonly');
        }
      });
    },


    saveProfile: function saveProfile() {

      console.log('saving profile...');

      userHandler.updateProfile({
        nome: this.state.nome,
        cognome: this.state.cognome,
        email: this.state.email,
        telefono: this.state.telefono
      });

      return false;
    },


    logout: function logout() {
      console.log('logout...');
      cognitoAuth.authUserLogout();
      this.cursors.user.set('authed', false);
      this.cursors.user.set('accessToken', null);
    },


    render: function() : React.PropTypes.element {

      return (
        <div className="page">
          <div className="container">
            <div className="spacer-40"></div>
            <div className="spacer-80"></div>
            <div className="text-center">
              <h1>Il tuo profilo</h1>
            </div>
            <button className='pure-button' onClick={this.logout}>Logout</button>
            <div className="spacer-10"></div>
            <hr/>
            <div className="pure-g">
              <div className="pure-u-1 pure-u-md-1-2">
                <div className="profile-padding">
                  <form id="profile-form" className="pure-form" onSubmit={this.saveProfile}>
                    <div className="pure-u-3-4">
                      <h3>Le tue informazioni</h3>
                    </div>
                    <div className="pure-u-1-4">
                    <button id="edit-profile" style={{"padding": "2px 5px;"}} className="pure-button pure-success">
                      <i className="fa fa-plus"></i>
                      <span onClick={this.editFields}>Modifica</span>
                    </button></div>
                    <div className="pure-control-group"><input type="text" name="nome" valueLink={this.linkState('nome')} placeholder="Nome" required ref='nome' /></div>
                    <div className="spacer-10"></div>
                    <div className="pure-control-group"><input type="text" name="cognome" valueLink={this.linkState('cognome')} placeholder="Cognome" required ref='cognome' /></div>
                    <div className="spacer-10"></div>
                    <div className="pure-control-group"><input type="email" name="email" valueLink={this.linkState('email')} placeholder="E-mail" required ref='email' /></div>
                    <div className="spacer-10"></div>
                    <div className="pure-control-group"><input type="text" name="telefono" valueLink={this.linkState('telefono')} placeholder="Recapito telefonico" required ref='telefono' /></div>
                    <div className="spacer-40"></div>
                    <div className="text-center"><button type="submit" className="pure-button pure-success"><span>Save profile</span></button></div>
                  </form>
                </div>
              </div>
              <div className="pure-u-1 pure-u-md-1-2">
                <div className="profile-padding">
                  <div className="pure-g">
                    <div className="pure-u-3-4">
                      <h3>I tuoi indirizzi di spedizione</h3>
                    </div>
                    <div className="pure-u-1-4"><button id="new-address" style={{"padding": "2px 5px;"}} className="pure-button pure-success"><i className="fa fa-plus"></i><span>Nuovo</span></button></div>
                  </div>
                  <ol>
                    <li className="single-address">
                      <blockquote>
                        <p>piazza L. V. Bertarelli 1<br/>20123, Milano</p>
                      </blockquote>
                    </li>
                  </ol>
                  <div className="spacer-40"></div>
                  <form id="delivery-form" style={{"display": "none"}} className="pure-form">
                    <div className="pure-control-group"><label>Etichetta</label><input type="text" name="etichetta" placeholder="Etichetta"/></div>
                    <div className="pure-g">
                      <div className="pure-u-19-24">
                        <div className="pure-control-group"><label>Via / P.zza</label><input type="text" name="via" placeholder="Via / P.zza"/></div>
                      </div>
                      <div className="pure-u-1-24"></div>
                      <div className="pure-u-4-24">
                        <div className="pure-control-group"><label>Numero</label><input type="text" name="numeroCivico" placeholder="Nr."/></div>
                      </div>
                    </div>
                    <div className="spacer-10"></div>
                    <div className="pure-g">
                      <div className="pure-u-5-24"><label>CAP</label><input type="text" name="cap" placeholder="CAP"/></div>
                      <div className="pure-u-1-24"></div>
                      <div className="pure-u-18-24"><label>Città</label><input type="text" name="citta" placeholder="Città"/></div>
                    </div>
                    <div className="spacer-40"></div>
                    <div className="text-center"><button type="submit" className="pure-button pure-success"><span>Salva indirizzo di spedizione</span></button></div>
                  </form>
                </div>
              </div>
            </div>
            <div className="spacer-60"></div>
          </div>
        </div>);
    }

  });

};
