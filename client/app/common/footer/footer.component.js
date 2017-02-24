import templateUrl from './footer.html'

export const footerComponent = {
  templateUrl,
  controller: class FooterComponent {
    constructor($footerScope){
      'ngInject'
    }
  }
}
