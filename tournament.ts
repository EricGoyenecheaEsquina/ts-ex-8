export class Team {
  nombre: string;
  ganados: number=0;
  perdidos: number=0;
  empates: number=0;
  puntos:number=0;
  constructor(nombre: string) {
    this.nombre = nombre;
  }
}
export class Tournament {
  public tally(input: string): string {
    let DevastatingDonkeys: Team = new Team("Devastating Donkeys");
    let AllegoricAlaskans: Team = new Team("Allegoric Alaskans");
    let result: string[] = input.replace(/(\r\n|\n|\r)/gm, "-").split("-");
    let header: string = 'Team                           | MP |  W |  D |  L |  P';
    let modified: Set<Team> = new Set();
    if (input != '') {
      let teams: Team[]=[];
      for (let item of result) {
        let [nombre1,nombre2,score] = item.split(";");
        let crear1: Boolean=true;
        let crear2: Boolean=true;
        for(let item of teams){
          if(item.nombre === nombre1){
            crear1=false;
          }
          if(item.nombre === nombre2){
            crear2=false;
          }
        }
        let equipo1 = DevastatingDonkeys;
        let equipo2 = AllegoricAlaskans;
        if(crear1){
          equipo1=new Team(nombre1);
          teams.push(equipo1);
        }
        if(crear2){
          equipo2=new Team(nombre2);
          teams.push(equipo2);
        }
        
        for (let item of teams) {
          if (item.nombre === nombre1) {
            equipo1 = item;
            modified.add(equipo1);
          }
          if (item.nombre === nombre2) {
            equipo2 = item;
            modified.add(equipo2);
          }
        }
        if (score === 'win') {
          equipo1.ganados ++;
          equipo2.perdidos ++;
        } else if (score === 'draw') {
          equipo1.empates ++;
          equipo2.empates ++;
        } else {
          equipo2.ganados ++;
          equipo1.perdidos ++;
        }
        equipo1.puntos= equipo1.ganados * 3 + equipo1.empates;
        equipo2.puntos= equipo2.ganados * 3 + equipo2.empates;
      }
      let modifiedArray: Team[]=Array.from(modified).sort((a, b) =>{
        if (b.nombre < a.nombre) return 1;
        return -1;
     });
      modifiedArray=modifiedArray.sort((a, b) =>{
        if (b.puntos > a.puntos) return 1;
        if (b.puntos === a.puntos) return 0;
        return -1;
     });
      for (let item of modifiedArray) {
        let totales: number = item.ganados + item.perdidos + item.empates;
        let puntos: number = item.ganados * 3 + item.empates;
        let puntosString:string=(puntos >10)?" | " + puntos:" |  " + puntos;
        let nombre: string = item.nombre;
        while(nombre.length < 31){
          nombre +=" ";
        }
        header += ("\n" + nombre + "|  " + totales + " |  " + item.ganados + " |  " + item.empates + " |  " + item.perdidos + puntosString);
      }
    }
    return (header);
  }
}
