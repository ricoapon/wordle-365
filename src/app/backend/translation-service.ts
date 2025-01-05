import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  constructor(private http: HttpClient) {}

  async translate(word: String): Promise<String> {
    const res = await firstValueFrom(this.http.get(this.createUrl(word)));
    return (res as String[])[0];
  }

  private createUrl(word: String): string {
    // We know the word has no special characters, so this works just fine.
    return "https://translate.googleapis.com/translate_a/t?client=gtx&sl=nl&tl=en&dt=t&q=" + word
  }
}
