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
    let BlitheringBadgers: Team = new Team("Blithering Badgers");
    let CourageousCalifornians: Team = new Team("Courageous Californians");
    let teams: Team[] = [DevastatingDonkeys, AllegoricAlaskans, BlitheringBadgers, CourageousCalifornians]
    let result: string[] = input.replace(/(\r\n|\n|\r)/gm, "-").split("-");
    let header: string = 'Team                           | MP |  W |  D |  L |  P';
    let modified: Set<Team> = new Set();
    if (input != '') {
      for (let item of result) {
        let resultUnic: string[] = item.split(";");
        let nombre1: string = resultUnic[0];
        let nombre2: string = resultUnic[1];
        let score: string = resultUnic[2];
        let equipo1 = DevastatingDonkeys;
        let equipo2 = AllegoricAlaskans;
        for (let item of teams) {
          if (item.nombre == nombre1) {
            equipo1 = item;
            modified.add(equipo1);
          }
          if (item.nombre == nombre2) {
            equipo2 = item;
            modified.add(equipo2);
          }
        }
        if (score == 'win') {
          equipo1.ganados += 1;
          equipo2.perdidos += 1;
        } else if (score == 'draw') {
          equipo1.empates += 1;
          equipo2.empates += 1;
        } else {
          equipo2.ganados += 1;
          equipo1.perdidos += 1;
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
        if (b.puntos == a.puntos) return 0;
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
