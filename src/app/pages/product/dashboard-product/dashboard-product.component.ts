import { Component, OnInit, ViewChildren, AfterViewInit, OnDestroy } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { CustomersGateway } from '../../../@core/data/customers.gateway';
import { ProductsGateway } from '../../../@core/data/products.gateway';
import { ProductBaseComponent } from '../../common/components/base-product.components';
import { NbThemeService } from '@nebular/theme';
import { delay } from 'rxjs/operators';

interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
}

@Component({
  selector: 'app-dashboard-product',
  templateUrl: './dashboard-product.component.html',
  styleUrls: ['./dashboard-product.component.scss']
})
export class DashboardProductComponent extends ProductBaseComponent implements AfterViewInit, OnDestroy {  
  
  
  productSunOptions:any;
  echartInstance: any;
  themeSubscription: any;

  constructor(    
    protected location: Location,
    protected customerGateway: CustomersGateway,            
    protected productGateway: ProductsGateway,        
    protected theme: NbThemeService,
    protected router: Router, 
    protected activatedRoute: ActivatedRoute) {       
      super(location, customerGateway, productGateway, theme, router, activatedRoute);
    }   

    ngAfterViewInit(): void {
      
    }

    onChangeQueryParameters(paramMap: ParamMap): void {                 
      super.onChangeQueryParameters(paramMap);        
      this.getDashboard();      
    }

    renderSun(targetData){
      var data = [
        {        
          name: 'Flora',
          itemStyle: {
              color: '#da0d68'
          },
          children: [{
              name: 'Black Tea',
              value: 1,
              itemStyle: {
                  color: '#975e6d'
              }
          }, {
              name: 'Floral',
              itemStyle: {
                  color: '#e0719c'
              },
              children: [{
                  name: 'Chamomile',
                  value: 1,
                  itemStyle: {
                      color: '#f99e1c'
                  }
              }, {
                  name: 'Rose',
                  value: 1,
                  itemStyle: {
                      color: '#ef5a78'
                  }
              }, {
                  name: 'Jasmine',
                  value: 1,
                  itemStyle: {
                      color: '#f7f1bd'
                  }
              }]
          }]
        }, 
    {
        name: 'Fruity',
        itemStyle: {
            color: '#da1d23'
        },
        children: [{
            name: 'Berry',
            itemStyle: {
                color: '#dd4c51'
            },
            children: [{
                name: 'Blackberry',
                value: 1,
                itemStyle: {
                    color: '#3e0317'
                }
            }, {
                name: 'Raspberry',
                value: 1,
                itemStyle: {
                    color: '#e62969'
                }
            }, {
                name: 'Blueberry',
                value: 1,
                itemStyle: {
                    color: '#6569b0'
                }
            }, {
                name: 'Strawberry',
                value: 1,
                itemStyle: {
                    color: '#ef2d36'
                }
            }]
        }, {
            name: 'Dried Fruit',
            itemStyle: {
                color: '#c94a44'
            },
            children: [{
                name: 'Raisin',
                value: 1,
                itemStyle: {
                    color: '#b53b54'
                }
            }, {
                name: 'Prune',
                value: 1,
                itemStyle: {
                    color: '#a5446f'
                }
            }]
        }, {
            name: 'Other Fruit',
            itemStyle: {
                color: '#dd4c51'
            },
            children: [{
                name: 'Coconut',
                value: 1,
                itemStyle: {
                    color: '#f2684b'
                }
            }, {
                name: 'Cherry',
                value: 1,
                itemStyle: {
                    color: '#e73451'
                }
            }, {
                name: 'Pomegranate',
                value: 1,
                itemStyle: {
                    color: '#e65656'
                }
            }, {
                name: 'Pineapple',
                value: 1,
                itemStyle: {
                    color: '#f89a1c'
                }
            }, {
                name: 'Grape',
                value: 1,
                itemStyle: {
                    color: '#aeb92c'
                }
            }, {
                name: 'Apple',
                value: 1,
                itemStyle: {
                    color: '#4eb849'
                }
            }, {
                name: 'Peach',
                value: 1,
                itemStyle: {
                    color: '#f68a5c'
                }
            }, {
                name: 'Pear',
                value: 1,
                itemStyle: {
                    color: '#baa635'
                }
            }]
        }, {
            name: 'Citrus Fruit',
            itemStyle: {
                color: '#f7a128'
            },
            children: [{
                name: 'Grapefruit',
                value: 1,
                itemStyle: {
                    color: '#f26355'
                }
            }, {
                name: 'Orange',
                value: 1,
                itemStyle: {
                    color: '#e2631e'
                }
            }, {
                name: 'Lemon',
                value: 1,
                itemStyle: {
                    color: '#fde404'
                }
            }, {
                name: 'Lime',
                value: 1,
                itemStyle: {
                    color: '#7eb138'
                }
            }]
        }]
    }, {
        name: 'Sour/\nFermented',
        itemStyle: {
            color: '#ebb40f'
        },
        children: [{
            name: 'Sour',
            itemStyle: {
                color: '#e1c315'
            },
            children: [{
                name: 'Sour Aromatics',
                value: 1,
                itemStyle: {
                    color: '#9ea718'
                }
            }, {
                name: 'Acetic Acid',
                value: 1,
                itemStyle: {
                    color: '#94a76f'
                }
            }, {
                name: 'Butyric Acid',
                value: 1,
                itemStyle: {
                    color: '#d0b24f'
                }
            }, {
                name: 'Isovaleric Acid',
                value: 1,
                itemStyle: {
                    color: '#8eb646'
                }
            }, {
                name: 'Citric Acid',
                value: 1,
                itemStyle: {
                    color: '#faef07'
                }
            }, {
                name: 'Malic Acid',
                value: 1,
                itemStyle: {
                    color: '#c1ba07'
                }
            }]
        }, {
            name: 'Alcohol/\nFremented',
            itemStyle: {
                color: '#b09733'
            },
            children: [{
                name: 'Winey',
                value: 1,
                itemStyle: {
                    color: '#8f1c53'
                }
            }, {
                name: 'Whiskey',
                value: 1,
                itemStyle: {
                    color: '#b34039'
                }
            }, {
                name: 'Fremented',
                value: 1,
                itemStyle: {
                    color: '#ba9232'
                }
            }, {
                name: 'Overripe',
                value: 1,
                itemStyle: {
                    color: '#8b6439'
                }
            }]
        }]
    }, {
        name: 'Green/\nVegetative',
        itemStyle: {
            color: '#187a2f'
        },
        children: [{
            name: 'Olive Oil',
            value: 1,
            itemStyle: {
                color: '#a2b029'
            }
        }, {
            name: 'Raw',
            value: 1,
            itemStyle: {
                color: '#718933'
            }
        }, {
            name: 'Green/\nVegetative',
            itemStyle: {
                color: '#3aa255'
            },
            children: [{
                name: 'Under-ripe',
                value: 1,
                itemStyle: {
                    color: '#a2bb2b'
                }
            }, {
                name: 'Peapod',
                value: 1,
                itemStyle: {
                    color: '#62aa3c'
                }
            }, {
                name: 'Fresh',
                value: 1,
                itemStyle: {
                    color: '#03a653'
                }
            }, {
                name: 'Dark Green',
                value: 1,
                itemStyle: {
                    color: '#038549'
                }
            }, {
                name: 'Vegetative',
                value: 1,
                itemStyle: {
                    color: '#28b44b'
                }
            }, {
                name: 'Hay-like',
                value: 1,
                itemStyle: {
                    color: '#a3a830'
                }
            }, {
                name: 'Herb-like',
                value: 1,
                itemStyle: {
                    color: '#7ac141'
                }
            }]
        }, {
            name: 'Beany',
            value: 1,
            itemStyle: {
                color: '#5e9a80'
            }
        }]
    }, {
        name: 'Other',
        itemStyle: {
            color: '#0aa3b5'
        },
        children: [{
            name: 'Papery/Musty',
            itemStyle: {
                color: '#9db2b7'
            },
            children: [{
                name: 'Stale',
                value: 1,
                itemStyle: {
                    color: '#8b8c90'
                }
            }, {
                name: 'Cardboard',
                value: 1,
                itemStyle: {
                    color: '#beb276'
                }
            }, {
                name: 'Papery',
                value: 1,
                itemStyle: {
                    color: '#fefef4'
                }
            }, {
                name: 'Woody',
                value: 1,
                itemStyle: {
                    color: '#744e03'
                }
            }, {
                name: 'Moldy/Damp',
                value: 1,
                itemStyle: {
                    color: '#a3a36f'
                }
            }, {
                name: 'Musty/Dusty',
                value: 1,
                itemStyle: {
                    color: '#c9b583'
                }
            }, {
                name: 'Musty/Earthy',
                value: 1,
                itemStyle: {
                    color: '#978847'
                }
            }, {
                name: 'Animalic',
                value: 1,
                itemStyle: {
                    color: '#9d977f'
                }
            }, {
                name: 'Meaty Brothy',
                value: 1,
                itemStyle: {
                    color: '#cc7b6a'
                }
            }, {
                name: 'Phenolic',
                value: 1,
                itemStyle: {
                    color: '#db646a'
                }
            }]
        }, {
            name: 'Chemical',
            itemStyle: {
                color: '#76c0cb'
            },
            children: [{
                name: 'Bitter',
                value: 1,
                itemStyle: {
                    color: '#80a89d'
                }
            }, {
                name: 'Salty',
                value: 1,
                itemStyle: {
                    color: '#def2fd'
                }
            }, {
                name: 'Medicinal',
                value: 1,
                itemStyle: {
                    color: '#7a9bae'
                }
            }, {
                name: 'Petroleum',
                value: 1,
                itemStyle: {
                    color: '#039fb8'
                }
            }, {
                name: 'Skunky',
                value: 1,
                itemStyle: {
                    color: '#5e777b'
                }
            }, {
                name: 'Rubber',
                value: 1,
                itemStyle: {
                    color: '#120c0c'
                }
            }]
        }]
    }, {
        name: 'Roasted',
        itemStyle: {
            color: '#c94930'
        },
        children: [{
            name: 'Pipe Tobacco',
            value: 1,
            itemStyle: {
                color: '#caa465'
            }
        }, {
            name: 'Tobacco',
            value: 1,
            itemStyle: {
                color: '#dfbd7e'
            }
        }, {
            name: 'Burnt',
            itemStyle: {
                color: '#be8663'
            },
            children: [{
                name: 'Acrid',
                value: 1,
                itemStyle: {
                    color: '#b9a449'
                }
            }, {
                name: 'Ashy',
                value: 1,
                itemStyle: {
                    color: '#899893'
                }
            }, {
                name: 'Smoky',
                value: 1,
                itemStyle: {
                    color: '#a1743b'
                }
            }, {
                name: 'Brown, Roast',
                value: 1,
                itemStyle: {
                    color: '#894810'
                }
            }]
        }, {
            name: 'Cereal',
            itemStyle: {
                color: '#ddaf61'
            },
            children: [{
                name: 'Grain',
                value: 1,
                itemStyle: {
                    color: '#b7906f'
                }
            }, {
                name: 'Malt',
                value: 1,
                itemStyle: {
                    color: '#eb9d5f'
                }
            }]
        }]
    }, {
        name: 'Spices',
        itemStyle: {
            color: '#ad213e'
        },
        children: [{
            name: 'Pungent',
            value: 1,
            itemStyle: {
                color: '#794752'
            }
        }, {
            name: 'Pepper',
            value: 1,
            itemStyle: {
                color: '#cc3d41'
            }
        }, {
            name: 'Brown Spice',
            itemStyle: {
                color: '#b14d57'
            },
            children: [{
                name: 'Anise',
                value: 1,
                itemStyle: {
                    color: '#c78936'
                }
            }, {
                name: 'Nutmeg',
                value: 1,
                itemStyle: {
                    color: '#8c292c'
                }
            }, {
                name: 'Cinnamon',
                value: 1,
                itemStyle: {
                    color: '#e5762e'
                }
            }, {
                name: 'Clove',
                value: 1,
                itemStyle: {
                    color: '#a16c5a'
                }
            }]
        }]
    }, {
        name: 'Nutty/\nCocoa',
        itemStyle: {
            color: '#a87b64'
        },
        children: [{
            name: 'Nutty',
            itemStyle: {
                color: '#c78869'
            },
            children: [ {
                name: 'Peanuts',
                value: 1,
                itemStyle: {
                    color: '#d4ad12'
                }
            }, {
                name: 'Hazelnut',
                value: 1,
                itemStyle: {
                    color: '#9d5433'
                }
            }, {
                name: 'Almond',
                value: 1,
                itemStyle: {
                    color: '#c89f83'
                }
            }]
        }, {
            name: 'Cocoa',
            itemStyle: {
                color: '#bb764c'
            },
            children: [{
                name: 'Chocolate',
                value: 1,
                itemStyle: {
                    color: '#692a19'
                }
            }, {
                name: 'Dark Chocolate',
                value: 1,
                itemStyle: {
                    color: '#470604'
                }
            }]
        }]
    }, {
        name: 'Sweet',
        itemStyle: {
            color: '#e65832'
        },
        children: [{
            name: 'Brown Sugar',
            itemStyle: {
                color: '#d45a59'
            },
            children: [{
                name: 'Molasses',
                value: 1,
                itemStyle: {
                    color: '#310d0f'
                }
            }, {
                name: 'Maple Syrup',
                value: 1,
                itemStyle: {
                    color: '#ae341f'
                }
            }, {
                name: 'Caramelized',
                value: 1,
                itemStyle: {
                    color: '#d78823'
                }
            }, {
                name: 'Honey',
                value: 1,
                itemStyle: {
                    color: '#da5c1f'
                }
            }]
        }, {
            name: 'Vanilla',
            value: 1,
            itemStyle: {
                color: '#f89a80'
            }
        }, {
            name: 'Vanillin',
            value: 1,
            itemStyle: {
                color: '#f37674'
            }
        }, {
            name: 'Overall Sweet',
            value: 1,
            itemStyle: {
                color: '#e75b68'
            }
        }, {
            name: 'Sweet Aromatics',
            value: 1,
            itemStyle: {
                color: '#d0545f'
            }
        }]
    }];
    
    this.productSunOptions = {
        title: {
            text: 'WORLD COFFEE RESEARCH SENSORY LEXICON',
            subtext: 'Source: https://worldcoffeeresearch.org/work/sensory-lexicon/',
            textStyle: {
                fontSize: 14,
                align: 'center'
            },
            subtextStyle: {
                align: 'center'
            },
            sublink: 'https://worldcoffeeresearch.org/work/sensory-lexicon/'
        },
        series: {
            type: 'sunburst',
            highlightPolicy: 'ancestor',
            data: targetData,
            radius: [0, '95%'],
            sort: null,
            levels: [{}, {
                r0: '15%',
                r: '35%',
                itemStyle: {
                    borderWidth: 2
                },
                label: {
                    rotate: 'tangential'
                }
            }, {
                r0: '35%',
                r: '70%',
                label: {
                    align: 'right',                    
                }
            }, {
                r0: '70%',
                r: '72%',
                label: {
                    position: 'outside',
                    padding: 3,
                    silent: false
                },
                itemStyle: {
                    borderWidth: 3
                }
            }]
        }
    };
    

    }

    getRandomColor(){
      const target = Math.random();
      if (target  < 0.1){
        return '#da0d68';
      }
      else if (target  < 0.2){
        return '#da1d23';
      }
      else if (target  < 0.3){
        return '#ebb40f';
      }
      else if (target  < 0.4){
        return '#187a2f';
      }
      else if (target  < 0.5){
        return '#0aa3b5';
      }      
      else {
        return '#ebb40f';        
      }
    }
    getDashboard(){
      this.productGateway.getProductDashboard(this.productId, this.startDate, this.endDate).subscribe(data=>{

        let result = [];
        const services = data.services;      
        const features = data.features;
        const featureMaps = data.featureMaps;
        const serviceMaps = data.serviceMaps;

        const  groups = [...new Set<string>(data.services.map(c=> {           
          return c.group;
        }))];

        groups.forEach(group => {
          const serviceGroup = services.filter(c=>c.group === group);
          let serviceChildren = [];

          serviceGroup.forEach(service=>{

            const featuresIds = serviceMaps[service.id];      
            const featuresList = [];
            featuresIds.forEach(item => {
              const target = features.filter(c=> c.id === item).pop();
              featuresList.push(target);        
            });     
            
            const featureChild = featuresList.map(c=>{
              return {
                name: c.name,
                value: c.availability,
                itemStyle: {
                    color: this.getRandomColor()
                }
              }
            });

            serviceChildren.push({              
                name: service.name.replace(group, ''),
                value: service.availability,
                itemStyle: {
                    color: this.getRandomColor()
                } ,
                children: featureChild     
            })
          });


          result.push({
            name: group,
            itemStyle: {
                color: this.getRandomColor()
            },
            children: serviceChildren
          });          
        });
              
        debugger;
        
        this.renderSun(result);

        /*
        this.sourceData = data.sources;
        this.featuresData = data.features;
        this.squadsData = data.squads;
        this.serviceMaps = data.serviceMaps;
        this.featureMaps = data.featureMaps;
        this.incidentMaps = data.incidentInformation;
        this.squadMaps = data.squadMaps;
        this.services = data.services.map(c=> { 
          c.title =  `SLO: ${c.slo} | Availability: ${c.availability}`;
          c.budget = Math.round( (c.availability * 1000) - (c.slo * 1000))/1000;
          c.badgetStatus = this.getBadgeStatus(c.availability, c.slo);                  
          return c;
         } );
        this.sourceTotal = data.sourceTotal;
        this.sourceStats = data.sourceStats; 
        this.serviceStats = data.servicesStats;
        this.featuresStats = data.featuresStats;     
        this.sloFails = data.sloFail;   
        this.featuresCoverage = data.featuresCoverage * 100;
        const sourceAvailability = parseFloat(data.sourceStats.mean) * 100;
        const serviceAvailability = parseFloat(data.servicesStats.mean) * 100;        
        const featureAvailability = parseFloat(data.featuresStats.mean) * 100;
        const sloProportion = parseFloat(data.sloProportion) * 100;
        this.themeSubscription = this.theme.getJsTheme().pipe(delay(1)).subscribe(config => {
          const solarTheme: any = config.variables.solar;  
          this.option = this.buildOptions(solarTheme, config, sourceAvailability);
          this.optionServices = this.buildOptions(solarTheme, config, serviceAvailability);
          this.optionFeatures = this.buildOptions(solarTheme, config, featureAvailability);
          this.optionSLO = this.buildOptions(solarTheme, config, sloProportion);
          this.optionSources = this.buildOptions(solarTheme, config, sourceAvailability);
        });*/
      });

    }


    private getBadgeStatus( availability: number, slo: number): string{
      const budget = Math.round( (availability * 1000) - (slo * 1000))/1000;
      if (budget < 0){
        return "danger";
      }      
      else{            
        return "success";
      }              
    }

    private getBudget(availability: number, slo: number): number{
      return Math.round( (availability * 10000) - (slo * 10000))/10000;
    }
    /*
    private getIndicatorSlo(indicators: number){
      const slo = this.currentService.featureSlo;
      if (!indicators) { return  slo;}
      return Math.round(Math.pow(slo, 1 / indicators) * 10000) /10000;
    }
    */
    
    onSunChartInit(ec) {
    this.echartInstance = ec;
    }
    ngOnDestroy() {
      if (this.themeSubscription){
        this.themeSubscription.unsubscribe();
      }      
    }
}
